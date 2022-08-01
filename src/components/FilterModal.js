import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { THEME } from '../styles/theme.style';
import { useTranslation } from 'react-i18next';
import { Input } from './Input';
import { Select } from './Select';
import { SearchIcon } from './svgs/Search';
import { CalendarIcon } from './svgs/Calendar';
import { LinearButton } from './LinearButton';
import { PREFERENCE_OPTIONS } from '../constants/global';
import { setFiltersAction } from '../redux/app';
import { formatdateTime } from '../utils/generalUtils';

export const FilterModal = ({
  toggleModal
}) => {
  const { width, height } = Dimensions.get('window')
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [isPreferenceOpen, setIsPreferenceOpen] = useState(false)
  const { subjects, searchedName, selectedDate, selectedPreference, selectedSubject } = useSelector(s => s.app);
  const [name, setName] = useState(searchedName)
  const [subject, setSubject] = useState(selectedSubject)
  const [date, setDate] = useState(JSON.parse(selectedDate))
  const [preference, setPreference] = useState(selectedPreference)
console.log('la dateeee', date)
console.log('red', selectedDate)
  const handleSelectSubject = (subject) => {
    setSubject(subject)
    setIsSubjectOpen(false)
  }

  const handleSelectPreference = (preference) => {
    setPreference(preference)
    setIsPreferenceOpen(false)
  }

  const handleSetIsSubjectOpen = (isOpen) => {
    setIsSubjectOpen(isOpen)
    if (isOpen) {
      setIsPreferenceOpen(false)
    }
  }

  const handleSetIsPreferenceOpen = (isOpen) => {
    setIsPreferenceOpen(isOpen)
    if (isOpen) {
      setIsSubjectOpen(false)
    }
  }

  const handleSubmit = () => {
    const newDate = date !== null ? date.setMinutes(0) : null
    dispatch(setFiltersAction({
      searchedName: name,
      selectedSubject: subject,
      selectedDate: newDate,
      selectedPreference: preference
    }))
  }

  const handleReset = () => {
    setName(null)
    setSubject(null)
    setDate(null)
    setPreference(false)
    dispatch(setFiltersAction({
      searchedName: null,
      selectedSubject: null,
      selectedDate: null,
      selectedPreference: false
    }))
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
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center'
      }}
      coverScreen
      isVisible={true}
      backdropColor="rgba(0, 0, 0, 0)"
      statusBarTranslucent
      onBackdropPress={toggleModal}
    >
      <View style={styles.modal}>
        <Text style={styles.description}>{t('explore.advanced')}</Text>
        <Input
          placeholder={t('explore.name')}
          defaultValue={name}
          onChangeText={(value) => setName(value)}
        >
          <SearchIcon color={THEME.colors.blueGray} size={20} />
        </Input>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsDateOpen(true)}
        >
          <Input
            editable={false}
            defaultValue={date && formatdateTime(date)}
            placeholder={t('explore.date')}
          >
            <CalendarIcon color={THEME.colors.blueGray} size={20} />
          </Input>
        </TouchableOpacity>
        <DatePicker
          modal
          date={new Date()}
          mode='datetime'
          open={isDateOpen}
          onConfirm={(value) => {
            setIsDateOpen(false)
            setDate(value)
          }}
          onCancel={() => {
            setIsDateOpen(false)
          }}
        />
        <Select
          isOpen={isSubjectOpen}
          setIsOpen={handleSetIsSubjectOpen}
          options={subjects}
          value={subjects.find(item => item.value === subject)?.label}
          defaultValue={t('explore.all')}
          handleSelect={handleSelectSubject}
        >
          <SearchIcon color={THEME.colors.blueGray} size={20} />
        </Select>
        <Select
          isOpen={isPreferenceOpen}
          setIsOpen={handleSetIsPreferenceOpen}
          options={PREFERENCE_OPTIONS}
          value={PREFERENCE_OPTIONS.find(item => item.value === preference)?.label}
          handleSelect={handleSelectPreference}
        >
          <SearchIcon color={THEME.colors.blueGray} size={20} />
        </Select>
        <LinearButton
          title={t('explore.reset')}
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          onPress={handleReset}
        />
        <LinearButton
          title={t('explore.research')}
          onPress={handleSubmit}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: hp('60'),
    width: wp('100%'),
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
    marginBottom: 15
  },

})

