import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, Image } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTeacherCalendar } from '../queries/CalendarQuery';
import Swiper from 'react-native-swiper';
import { THEME } from '../styles/theme.style';
import { ChevronLeftIcon } from '../components/svgs/ChevronLeft';
import { ChevronRightIcon } from '../components/svgs/ChevronRight';
import { Routes } from '../constants/routes';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { canReview, getTeacher } from '../queries/TeacherQuery';
import { BookModal } from '../components/BookModal';
import { ReviewCard } from '../components/ReviewCard';
import { StarIcon } from '../components/svgs/Star';
import { PositionIcon } from '../components/svgs/Position';
import { LinearButton } from '../components/LinearButton';
import { ReviewModal } from '../components/ReviewModal';
import { CODES } from '../constants/global';

export const TeacherScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [calendar, setCalendar] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [safeIndex, setSafeIndex] = useState(0)
  const [teacher, setTeacher] = useState({})
  const [isOpinion, setIsOpinion] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [subjects, setSubjects] = useState([])
  const [hours, setHours] = useState([])
  const [canPostReview, setCanPostReview] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { id } = route.params;

  const { width, height } = Dimensions.get('window')
console.log(JSON.stringify(calendar))
  const fetchCalendar = async () => {
    setRefreshing(true)
    const response = await getTeacherCalendar(id)
    if (response) {
      setCalendar(response)
      setRefreshing(false)
    }
  }

  const fetchTeacher = async () => {
    const response = await getTeacher(id)
    if (response) {
      setTeacher(response)
      if (response.teacher_subjects) {
        let datas = []
        response.teacher_subjects.map(item => {
          datas = [...datas, {
            id: item.subject.id,
            label: item.subject.libelle,
            value: item.subject.slug
          }]
        })
        setSubjects(datas)
      }
    }
  }

  const fetchCanReview = async () => {
    const res = await canReview(id)
    if (res) {
      setCanPostReview(res)
    }
  }

  const handleSelectSchedule = (schedule, hours, idx) => {
    setSafeIndex(currentIndex)
    let durations = []
    let index = idx
    let val = 1
    while (!hours[index].disabled) {
      durations = [...durations, {
        label: `${val}h`,
        value: val
      }]
      if (index === hours.length - 1) {
        break;
      } else {
        index += 1
        val += 1
      }
    }
    setHours(durations)
    setCurrentSchedule(schedule)
  }

  useEffect(() => {
    fetchCalendar()
    fetchTeacher()
    fetchCanReview()
  }, [])

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
            <Text style={styles.dayLabel}>{item.date.month}</Text>
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
            <TouchableOpacity
              key={`${index}-${idx}`} style={styles.hour}
              activeOpacity={0.5}
              disabled={hour.disabled}
              onPress={() => handleSelectSchedule(`${item.date.full} ${hour.time}`, item.hours, idx)}
            >
              <View style={styles.hourLeft}>
                <Text style={styles.time}>{hour.time}</Text>
              </View>
              {hour.lesson ?
                <View style={[styles.hourRight, { height: 75, backgroundColor: THEME.colors.bg }]}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.push(Routes.Colab, { id: hour.lesson.id })}
                    style={[styles.lesson, { backgroundColor: hour.lesson.subject.color || THEME.colors.primary, height: 75 * hour.lesson.duration, zIndex: 99 }]}
                  >
                     <View style={styles.lessonHeader}>
                      <Text style={styles.subj}>{hour.time} - {t(`subject.${hour.lesson.subject.slug}`)}</Text>
                    </View>
                    <View style={styles.lessonFooter}>
                      {hour.lesson.capacity > 1 &&
                        <Text style={styles.group}>{`${hour.lesson.students.length}/${hour.lesson.capacity} ${t('lessons.students')}`}</Text>
                      }
                    </View>
                  </TouchableOpacity>
                </View>
                :
                hour.disabled ?
                  <View style={[styles.hourRight, { height: 75, backgroundColor: THEME.colors.lightGray }]}>
                    <Text style={styles.disabledText}>{t('teacher.notavailable')}</Text>
                  </View>
                  :
                  <View style={[styles.hourRight, { height: 75, borderTopWidth: 1, borderColor: THEME.colors.lightGray }]}></View>
              }
            </TouchableOpacity>
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

  const displayReviews = () => teacher.reviews.map((item, idx) => <ReviewCard key={idx} item={item} />)

  const toggleModal = (isLoading) => {
    if (!isLoading) {
      setCurrentSchedule(null)
      setCurrentIndex(safeIndex)
    }
  }

  const displaySubjects = () => teacher?.teacher_subjects?.map((item, idx) => (
    <Text key={idx} style={[styles.subject, { backgroundColor: item.subject.color }]}>{t(item.subject.libelle)}</Text>
  ))

  return (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.contain}
    >
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
        <View style={styles.teacher}>
          <View style={styles.teacherTop}>
            <Image
              source={{ uri: teacher.image }}
              style={styles.img}
            />
            <View style={styles.teacherContain}>
              <View style={styles.sectionLongFlex}>
                <Text style={styles.title}>{teacher.firstname} {teacher.lastname}</Text>
                <View style={styles.sectionFlex}>
                  <Text style={styles.title}>{teacher.note}</Text>
                  <StarIcon size={18} color={THEME.colors.darkGray} />
                </View>
              </View>
              <View style={styles.sectionFlex} >
                <PositionIcon color={THEME.colors.darkGray} size={18} />
                <Text style={[styles.text, { marginLeft: 5 }]}>{teacher?.address?.city}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                  <Text style={styles.text}>{teacher?.teacher_profil?.description}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={[styles.text, { textTransform: 'uppercase', fontWeight: 'bold' }]}>{teacher?.teacher_profil?.currency} {teacher?.teacher_profil?.rate} / h</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.subjects}>
            {displaySubjects()}
          </View>
        </View>
        <View style={styles.tabArea}>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={!isOpinion}
            onPress={() => setIsOpinion(false)}
            style={[styles.tab, { borderColor: isOpinion ? THEME.colors.white : THEME.colors.primary }]}
          >
            <Text style={[styles.tabTitle, { color: isOpinion ? THEME.colors.blueGray : THEME.colors.primary }]}>{t('teacher.calendar')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsOpinion(true)}
            disabled={isOpinion}
            activeOpacity={0.5}
            style={[styles.tab, { borderColor: isOpinion ? THEME.colors.primary : THEME.colors.white }]}
          >
            <Text style={[styles.tabTitle, { color: isOpinion ? THEME.colors.primary : THEME.colors.blueGray }]}>{t('teacher.reviews')}</Text>
          </TouchableOpacity>
        </View>
        {isOpinion ?
          <View>
            {canPostReview &&
              <View style={styles.reviewBtn}>
                <LinearButton
                  title='Ajouter un commentaire'
                  marginBottom={0}
                  onPress={() => setIsOpen(true)}
                />
              </View>
            }
            {isOpen &&
              <ReviewModal toggleModal={() => setIsOpen(false)} teacher={teacher.id} setCanPostReview={setCanPostReview} fetchTeacher={fetchTeacher} />
            }
            {displayReviews()}
          </View>
          :
          <>
            <Swiper onScroll={(index) => handleScroll(index)} index={currentIndex} loop={false} showsButtons={false}>
              {displayCalendar()}
            </Swiper>
            {currentSchedule &&
              <BookModal toggleModal={toggleModal} subjects={subjects} hours={hours} currentSchedule={currentSchedule} teacher={teacher.id} rate={teacher?.teacher_profil?.rate} currency={teacher?.teacher_profil?.currency} />
            }
          </>
        }
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
    backgroundColor: THEME.colors.white
  },
  bottomSection: {
    flex: 1
  },
  tabCalendar: {
    height: '68%',
    margin: '5%',
    marginBottom: '20%'
  },
  tabArea: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.white
  },
  tab: {
    padding: 8,
    width: '50%',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
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
    padding: 5,
    height: 75
  },
  hourRight: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    color: THEME.colors.blueGray
  },
  lesson: {
    borderRadius: 5,
    padding: 8,
    width: '100%'
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subj: {
    color: THEME.colors.white
  },
  subject: {
    color: THEME.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
    marginRight: 5,
    marginBottom: 5
  },
  group: {
    backgroundColor: THEME.colors.white,
    color: THEME.colors.darkGray,
    fontSize: 11,
    borderRadius: 25,
    paddingHorizontal: 10,
    alignSelf:'flex-end'
  },
  description: {
    color: THEME.colors.white,
    fontSize: 12
  },
  disabledText: {
    color: THEME.colors.blueGray
  },
  teacher: {
    paddingHorizontal: 15,
    backgroundColor: THEME.colors.white
  },
  teacherTop: {
    flexDirection: 'row'
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: THEME.colors.noPic
  },
  sectionFlex: {
    flexDirection: 'row'
  },
  sectionLongFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: THEME.colors.black,
    fontWeight: '700',
    fontSize: 16
  },
  text: {
    color: THEME.colors.black,
    fontSize: 12
  },
  teacherContain: {
    flex: 1,
    paddingLeft: 10
  },
  subjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 5
  },
  reviewBtn: {
    paddingHorizontal: '8%',
    paddingVertical: '5%'
  }
})