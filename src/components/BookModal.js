import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { bookLesson } from '../queries/LessonQuery';
import { THEME } from '../styles/theme.style';
import { LinearButton } from './LinearButton';
import { Select } from './Select';

export const BookModal = ({
  toggleModal,
  subjects,
  hours,
  teacher,
  currentSchedule
}) => {
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isHourOpen, setIsHourOpen] = useState(false)
  const [schedule, setSchedule] = useState(currentSchedule)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedHour, setSelectedHour] = useState(1)
  const [selectedTeacher, setSelectedTeacher] = useState(teacher)
  const { width, height } = Dimensions.get('window')
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject)
    setIsSubjectOpen(false)
  }

  const handleSelectHour = (hour) => {
    setSelectedHour(hour)
    setIsHourOpen(false)
  }

  const handleSubmit = async () => {
    if (schedule && selectedHour, selectedSubject) {
      setIsLoading(true)
      const response = await bookLesson({
        "teacher_id": selectedTeacher,
        "scheduled_at": schedule,
        "duration": selectedHour,
        "subject_id": subjects.find(item => item.value === selectedSubject)?.id
      })
      if (response) {
        setIsLoading(false)
        toggleModal(false)
        console.log('response', response)
      }
    }
  }

  return (
    <Modal
      useNativeDriverForBackdrop
      hasBackdrop
      deviceWidth={width}
      deviceHeight={height}
      useNativeDriver
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionOutTiming={0}
      style={{
        margin: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
      coverScreen
      isVisible={true}
      backdropColor="rgba(0, 0, 0, 0.6)"
      statusBarTranslucent
      onBackdropPress={() => toggleModal(isLoading)}
    >
      <View style={styles.modal}>
        <Text style={styles.description}>Pour réserver un cours avec Mohamed le {schedule} vous devez préalablement choisir la matière à étudier ainsi que la durée du cours.</Text>
        <Select
          isOpen={isSubjectOpen}
          setIsOpen={setIsSubjectOpen}
          value={subjects.find(item => item.value === selectedSubject)?.label}
          handleSelect={handleSelectSubject}
          defaultValue={'Matière'}
          options={subjects}
        />
        <Select
          isOpen={isHourOpen}
          setIsOpen={setIsHourOpen}
          value={hours.find(item => item.value === selectedHour)?.label}
          handleSelect={handleSelectHour}
          defaultValue={'Durée'}
          options={hours}
        />
        {isLoading &&
          <ActivityIndicator
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
            size={'large'} color={THEME.colors.primary}
          />
        }
        <LinearButton
          title='Confirmer'
          onPress={handleSubmit}
          disabled={isLoading}
        />
        <LinearButton
          title='Annuler'
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          marginBottom={0}
          onPress={()=>toggleModal(isLoading)}
          disabled={isLoading}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    maxHeight: hp('50%'),
    width: wp('85%'),
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 10,
    backgroundColor: THEME.colors.bg,
    borderRadius: 5,
    padding: 25
  },
  description: {
    color: THEME.colors.darkGray,
    textAlign: 'center'
  }
})

