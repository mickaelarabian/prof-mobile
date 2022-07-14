import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { bookLesson } from '../queries/LessonQuery';
import { THEME } from '../styles/theme.style';
import { toastError } from '../utils/toastUtils';
import { LinearButton } from './LinearButton';
import { Select } from './Select';

export const BookModal = ({
  toggleModal,
  subjects,
  hours,
  teacher,
  currentSchedule,
  rate,
  currency
}) => {
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isHourOpen, setIsHourOpen] = useState(false)
  const [schedule, setSchedule] = useState(currentSchedule)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedHour, setSelectedHour] = useState(1)
  const [selectedTeacher, setSelectedTeacher] = useState(teacher)
  const [isLoading, setIsLoading] = useState(false)
  const [isSelected, setSelection] = useState(false);
  const { width, height } = Dimensions.get('window')
console.log('currentSchedule', currentSchedule)
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
        "subject_id": subjects.find(item => item.value === selectedSubject)?.id,
        "at_home": isSelected
      })
      if (response) {
        setIsLoading(false)
        toggleModal(false)
        console.log('response', response)
      }
    } else {
      toastError('Tous les champs doivent être complété')
    }
  }

  return (
    <Modal
      useNativeDriverForBackdrop
      hasBackdrop
      deviceWidth={width}
      deviceHeight={height + 50}
      useNativeDriver
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionOutTiming={0}
      style={{
        margin: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
      coverScreen
      isVisible={true}
      backdropColor="rgba(0, 0, 0, 0.6)"
      statusBarTranslucent
      onBackdropPress={() => toggleModal(isLoading)}
    >
      <View style={styles.modal}>
        <Text style={styles.description}>Réserver un cours avec Mohamed le {schedule}.</Text>
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
        <TouchableOpacity
          onPress={() => setSelection(!isSelected)}
          activeOpacity={0.5}
          style={styles.checkboxArea}
        >
          <CheckBox
            tintColor={THEME.colors.primary}
            tintColors={{ true: THEME.colors.primary, false: THEME.colors.primary }}
            onFillColor={THEME.colors.primary}
            onTintColor={THEME.colors.primary}
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.checkText}>Cours à domicile</Text>
        </TouchableOpacity>
        <Text style={styles.price}>Total : {rate * selectedHour} {currency.toUpperCase()}</Text>
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
          onPress={() => toggleModal(isLoading)}
          disabled={isLoading}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    maxHeight: hp('70%'),
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
    color: THEME.colors.gray,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 5
  },
  price: {
    fontWeight: 'bold',
    color: THEME.colors.darkGray,
    marginBottom: 10,
    alignSelf:'flex-end'
  },
  checkboxArea: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center'
  },
  checkbox: {

  },
  checkText: {
    color: THEME.colors.darkGray
  }
})

