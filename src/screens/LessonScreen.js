import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton';
import { getCalendar } from '../queries/CalendarQuery';
import Swiper from 'react-native-swiper';
import { THEME } from '../styles/theme.style';
import { ChevronLeftIcon } from '../components/svgs/ChevronLeft';
import { ChevronRightIcon } from '../components/svgs/ChevronRight';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { cancelLesson, getLesson } from '../queries/LessonQuery';
import { LinearButton } from '../components/LinearButton';
import { CODES } from '../constants/global';

export const LessonScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = route.params;
  const [lesson, setLesson] = useState({})

  const fetchLesson = async () => {
    const response = await getLesson(id)
    if (response) {
      setLesson(response)
    }
  }
  // console.log('lesson', JSON.stringify(lesson))
  useEffect(() => {
    fetchLesson()
  }, [id])

  const handleCancel = async (id) => {
    const response = await cancelLesson(id)
    if (response) {
      console.log('response', response)
      fetchLesson()
    }
  }

  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={{ flexGrow: 1 }} style={styles.contain}>
      <View style={styles.topSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeftIcon size={35} color={THEME.colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <Text style={[styles.title, { backgroundColor: lesson?.subject?.color }]}>{t(lesson?.subject?.libelle)}</Text>
        <View>
          <View style={styles.infosRow}>
            <Text style={styles.subTitle}>Professeur :</Text>
            <Text style={styles.text}>{`${lesson?.teacher?.firstname} ${lesson?.teacher?.lastname}`}</Text>
          </View>
          <View style={styles.infosRow}>
            <Text style={styles.subTitle}>Statut :</Text>
            <Text style={[styles.status, { backgroundColor: CODES[lesson?.status?.code], color: lesson?.status?.code === 'unconfirmed' ? THEME.colors.gray : THEME.colors.white }]}>{lesson?.status?.code}</Text>
          </View>
          <Text style={styles.subTitle}>Description :</Text>
          <Text style={[styles.text, { marginBottom: 15 }]}>{lesson?.teacher_subject?.description}</Text>
          <View style={styles.infosRow}>
            <Text style={styles.subTitle}>Date :</Text>
            <Text style={styles.text}>{lesson?.scheduled_at}</Text>
          </View>
          <View style={styles.infosRow}>
            <Text style={styles.subTitle}>Durée :</Text>
            <Text style={styles.text}>{lesson?.duration}h</Text>
          </View>
          <View style={styles.infosRow}>
            <Text style={styles.subTitle}>Type :</Text>
            <Text style={styles.text}>Vidéo Zoom</Text>
          </View>
          <Text style={styles.subTitle}>Students:</Text>
          <View style={styles.header}>
            <View style={styles.col}>
              <Text style={styles.rowTitle}>Prénom</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.rowTitle}>Nom</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.rowTitle}>Statut</Text>
            </View>
          </View>
          {lesson?.students?.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.rowText}>{item.firstname}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.rowText}>{item.lastname}</Text>
              </View>
              <View style={styles.col}>
                <Text style={[styles.status, { backgroundColor: CODES[item?.pivot?.status?.code], color: item.pivot.status.code === 'unconfirmed' ? THEME.colors.blueGray : THEME.colors.white }]}>{item?.pivot?.status?.code}</Text>
              </View>
            </View>
          ))
          }
        </View>
        {lesson?.status?.code !== 'cancelled' &&
          <View style={styles.btnArea}>
            <LinearButton
              primary={THEME.colors.white}
              secondary={THEME.colors.white}
              color={THEME.colors.primary}
              title={'Annuler le cours'}
              width='50%'
              rounded={false}
              marginBottom={0}
              fontSize={17}
              onPress={() => handleCancel(lesson.id)}
            />
            <LinearButton
              title='Rejoindre le cours'
              width='50%'
              rounded={false}
              marginBottom={0}
              fontSize={17}
            />
          </View>
        }
      </View>
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
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