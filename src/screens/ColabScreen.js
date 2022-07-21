import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton';
import { getCalendar } from '../queries/CalendarQuery';
import Swiper from 'react-native-swiper';
import { THEME } from '../styles/theme.style';
import { ChevronLeftIcon } from '../components/svgs/ChevronLeft';
import { ChevronRightIcon } from '../components/svgs/ChevronRight';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { cancelLesson, getLesson, joinLesson } from '../queries/LessonQuery';
import { LinearButton } from '../components/LinearButton';
import { CODES } from '../constants/global';
import { addDuration, formatdateTime } from '../utils/generalUtils';
import { setCalendarAction } from '../redux/calendar';

export const ColabScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = route.params;
  const [lesson, setLesson] = useState({})
  const { user } = useSelector(s => s.user);
  const [isInLesson, setIsInLesson] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  // console.log('user', user)
  const fetchLesson = async () => {
    setRefreshing(true)
    const response = await getLesson(id)
    if (response) {
      setLesson(response)
      setRefreshing(false)
      if (response.students.findIndex(item => item.id === user.id) > -1) {
        setIsInLesson(true)
      }
    }
  }
  // console.log('lesson', JSON.stringify(lesson))
  useEffect(() => {
    fetchLesson()
  }, [id])

  const fetchCalendar = async () => {
    const response = await getCalendar()
    if (response) {
      dispatch(setCalendarAction(response))
    }
  }

  const handleCancel = async (id) => {
    setRefreshing(true)
    const response = await cancelLesson(id)
    if (response) {
      setRefreshing(false)
      fetchLesson()
      fetchCalendar()
    }
  }

  const showConfirmSubscribe = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to join this lesson ?",
      [
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
        // The "Yes" button
        {
          text: "Yes",
          onPress: async () => {
            handleSubscribe(lesson?.id)
          },
        }
      ]
    );
  };

  const showConfirmCancel = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to cancel this lesson ?",
      [
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
        // The "Yes" button
        {
          text: "Yes",
          onPress: async () => {
            handleCancel(lesson.id)
          },
        }
      ]
    );
  };

  const handleSubscribe = async (id) => {
    setRefreshing(true)
    const response = await joinLesson(id)
    if (response) {
      setRefreshing(false)
      console.log('response', response)
      fetchLesson()
    }
  }

  const onRefresh = useCallback(() => {
    fetchLesson()
  }, [])

  const currentDate = new Date().getTime()
  const endDate = lesson.scheduled_at ? addDuration(lesson.duration, lesson.scheduled_at) : new Date()
  const isTooLate = currentDate > endDate.getTime()

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      scrollEnabled={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.contain}
    >
      {lesson.status &&
        <>
          <View style={styles.topSection}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
              style={styles.back}
            >
              <ArrowLeftIcon size={35} color={THEME.colors.gray} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSection}>
            <Text style={[styles.title, { backgroundColor: lesson?.subject?.color }]}>{t(lesson?.subject?.libelle)}</Text>
            <View>
              <View style={styles.infosRow}>
                <Text style={styles.subTitle}>{t('lessons.teacher')} :</Text>
                <Text style={styles.text}>{`${lesson?.teacher?.firstname} ${lesson?.teacher?.lastname}`}</Text>
              </View>
              <View style={styles.infosRow}>
                <Text style={styles.subTitle}>{t('lessons.status')} :</Text>
                <Text style={[styles.status, { backgroundColor: CODES[lesson?.status?.code], color: lesson?.status?.code === 'unconfirmed' ? THEME.colors.gray : THEME.colors.white }]}>{lesson?.status?.code}</Text>
              </View>
              <Text style={styles.subTitle}>{t('lessons.description')} :</Text>
              <Text style={[styles.text, { marginBottom: 15 }]}>{lesson?.teacher_subject?.description}</Text>
              <View style={styles.infosRow}>
                <Text style={styles.subTitle}>{t('lessons.schedule')} :</Text>
                <Text style={styles.text}>{lesson.scheduled_at && formatdateTime(lesson?.scheduled_at, true)}</Text>
              </View>
              <View style={styles.infosRow}>
                <Text style={styles.subTitle}>{t('lessons.duration')} :</Text>
                <Text style={styles.text}>{lesson?.duration}h</Text>
              </View>
              <View style={styles.infosRow}>
                <Text style={styles.subTitle}>{t('lessons.type')} :</Text>
                <Text style={styles.text}>Vidéo Zoom</Text>
              </View>
              <View style={styles.infosRow}>
                <Text style={styles.subTitle}>{t('lessons.students')}:</Text>
                <Text style={styles.text}>{`${lesson?.students?.length} / ${lesson?.capacity} ${t('lessons.students')}`}</Text>
              </View>

            </View>
          </View>
          <View style={styles.btnArea}>
            {!isInLesson ?
              <LinearButton
                textTransform='uppercase'
                title={`${t('lessons.subscribe')} ${lesson?.amount} ${lesson?.currency}`}
                onPress={showConfirmSubscribe}
              />
              :
              <>
                {lesson.status.code !== 'cancelled' && !isTooLate &&
                  <>
                    <LinearButton
                      primary={THEME.colors.white}
                      secondary={THEME.colors.white}
                      color={THEME.colors.primary}
                      title={t('lessons.cancel')}
                      fontSize={17}
                      onPress={showConfirmCancel}
                      flex={1}
                    />
                    {lesson.status.code === 'confirmed' &&
                      <LinearButton
                        title={t('lessons.join')}
                        fontSize={17}
                        flex={1}
                      />
                    }
                  </>
                }
              </>
            }
          </View>
        </>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contain: {
  },
  title: {
    color: THEME.colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 5
  },
  subTitle: {
    color: THEME.colors.darkGray,
    fontWeight: '700'
  },
  topSection: {
    padding: '8%',
    paddingTop: '10%'
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: '8%',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: THEME.colors.blueGray
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: THEME.colors.lightGray,
    padding: 10
  },
  col: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  rowTitle: {
    color: THEME.colors.darkGray,
    fontWeight: '700'
  },
  rowText: {
    color: THEME.colors.gray,
    textTransform: 'capitalize'
  },
  btnArea: {
    paddingHorizontal: '8%',
    marginBottom: 15
  },
  text: {
    color: THEME.colors.gray
  },
  infosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  status: {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    fontWeight: '700',
    textTransform: "capitalize",
    fontSize: 11
  }
})