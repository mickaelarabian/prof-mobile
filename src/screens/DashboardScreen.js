import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux';
import { LanguageButton } from '../components/LanguageButton';
import { getCalendar } from '../queries/CalendarQuery';
import Swiper from 'react-native-swiper';
import { THEME } from '../styles/theme.style';
import { ChevronLeftIcon } from '../components/svgs/ChevronLeft';
import { ChevronRightIcon } from '../components/svgs/ChevronRight';
import { Routes } from '../constants/routes';
import { Title } from '../components/Title';
import { useTranslation } from 'react-i18next';

export const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  const { width, height } = Dimensions.get('window')

  const fetchCalendar = async () => {
    setRefreshing(true)
    const response = await getCalendar()
    if (response) {
      setCalendar(response)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCalendar()
  }, [])
  // console.log('ca', JSON.stringify(calendar))

  const onRefresh = useCallback(() => {
    fetchCalendar()
  }, []);

  const displayCalendar = () => {
    let displayedDays = []
    Object.values(calendar).forEach((item, index) => {
      displayedDays = [...displayedDays,
      <View key={index} style={styles.tabCalendar}>
        <View style={styles.day}>
          <TouchableOpacity
            style={styles.chevron}
            disabled={currentIndex === 0}
            activeOpacity={0.5}
            onPress={() => setCurrentIndex(currentIndex - 1)}
          >
            <ChevronLeftIcon color={currentIndex === 0 ? THEME.colors.white : THEME.colors.blueGray} size={28} />
          </TouchableOpacity>
          <View style={styles.dayInfos}>
            <Text style={styles.number}>{item.date.day}</Text>
            <Text style={styles.dayLabel}>{item.date.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.chevron}
            activeOpacity={0.5}
            disabled={currentIndex === Object.values(calendar).length - 1}
            onPress={() => setCurrentIndex(currentIndex + 1)}
          >
            <ChevronRightIcon color={currentIndex === Object.values(calendar).length - 1 ? THEME.colors.white : THEME.colors.blueGray} size={28} />
          </TouchableOpacity>
        </View>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          {item.hours.map((hour, idx) => (
            <View key={`${index}-${idx}`} style={styles.hour}>
              <View style={styles.hourLeft}>
                <Text style={styles.time}>{hour.time}</Text>
              </View>
              {hour.lesson ?
                <View style={[styles.hourRight, { height: 75, zIndex: 2 }]}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.push(Routes.Lesson, { id: hour.lesson.id })}
                    style={[styles.lesson, { backgroundColor: hour.lesson.subject.color || THEME.colors.primary, height: 75 * hour.lesson.duration, justifyContent: 'space-between', zIndex: 99 }]}
                  >
                    <View style={styles.lessonHeader}>
                      <Text style={styles.subject}>{hour.time} - {hour.lesson.subject.slug}</Text>
                      <Text style={styles.teacher}>{hour.lesson.teacher.firstname} {hour.lesson.teacher.lastname}</Text>
                    </View>
                    <View>
                      <Text numberOfLines={3} style={styles.description}>{hour.lesson.teacher_subject.description}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                :
                <View style={[styles.hourRight, { height: 75, borderTopWidth: 1, borderColor: THEME.colors.lightGray }]}></View>
              }
            </View>
          ))}
        </ScrollView>
      </View>
      ]
    });
    return displayedDays
  }

  const handleScroll = (index) => {
    const result = index.nativeEvent.contentOffset.x / width
    if (Number.isInteger(result) && result !== currentIndex) {
      setCurrentIndex(result)
    }
  }

  return (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.contain}
    >
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Title title={t('calendar.title')} />
        <Swiper onScroll={(index) => handleScroll(index)} index={currentIndex} loop={false} showsButtons={false}>
          {displayCalendar()}
        </Swiper>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contain: {
    paddingBottom: 200
  },
  topSection: {
    padding: '8%',
    paddingTop: '10%',
    paddingBottom:'7%'
  },
  bottomSection: {
    flex: 1
  },
  tabCalendar: {
    height: '83%',
    margin: '5%',
    marginBottom: '20%'
  },
  day: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  dayInfos: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  chevron: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    fontSize: 22,
    color: THEME.colors.primary,
    fontWeight: '700'
  },
  dayLabel: {
    fontSize: 18,
    color: THEME.colors.primary,
    alignSelf: 'center',
    marginLeft: 10
  },
  hour: {
    flexDirection: 'row'
  },
  hourLeft: {
    flex: 1,
    padding:5,
    height: 75
  },
  hourRight: {
    flex: 4
  },
  time: {
    color: THEME.colors.blueGray
  },
  lesson: {
    borderRadius: 5,
    padding: 8
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subject: {
    color: THEME.colors.white
  },
  teacher: {
    color: THEME.colors.white,
    fontSize: 12
  },
  description: {
    color: THEME.colors.white,
    fontSize: 12
  }
})