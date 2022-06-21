import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { LanguageButton } from '../components/LanguageButton';
import { LinearButton } from '../components/LinearButton';
import { PositionIcon } from '../components/svgs/Position';
import { getSubjects } from '../queries/SubjectQuery';
import { THEME } from '../styles/theme.style';
import { useTranslation } from 'react-i18next';
import { getTeachers } from '../queries/TeacherQuery';
import { TeacherCard } from '../components/TeacherCard';
import { Title } from '../components/Title';

export const ExploreScreen = ({ navigation }) => {
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  const fetchSubjects = async () => {
    const response = await getSubjects()
    if (response) {
      setSubjects(response)
    }
  }

  useEffect(() => {
    fetchSubjects()
    handleSearch()
  }, [])

  const handleSelectSubject = (id) => {
    setIsOpen(false)
    setSelectedSubject(id)
  }

  const handleChangeText = (subject) => {
    if (!isOpen) {
      setIsOpen(true)
    }
    setSelectedSubject(subject)
  }

  const displaySuggestions = () => subjects.map((item, idx) => (
    <TouchableOpacity
      key={idx}
      activeOpacity={0.5}
      onPress={() => handleSelectSubject(item.id)}
    >
      <Text style={styles.suggestion}>{t(item.libelle)}</Text>
    </TouchableOpacity>
  ))

  const handleSearch = async () => {
    const response = await getTeachers(selectedSubject)
    if (response) {
      setTeachers(response.data)
    }
  }

  const keyExtractor = useCallback(({ id }) => `teacher-${id}`, []);

  const renderTeacher = ({ item, index }) => <TeacherCard key={index} teacher={item} index={index} />

  const onRefresh = useCallback(() => {
    handleSearch()
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Title title='Explorer' />
        <View>
          <View style={styles.completeInput}>
            <View style={styles.icon}>
              <PositionIcon size={20} />
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="sentences"
              placeholder={'Search a place, a teacher ...'}
              defaultValue={t(subjects.find(item => item.id === selectedSubject)?.libelle) || selectedSubject}
              placeholderTextColor="#666666"
              onChangeText={(subject) => handleChangeText(subject)}
              onFocus={() => setIsOpen(true)}
            />
          </View>
          {isOpen &&
            <View style={styles.suggestions}>
              {displaySuggestions()}
            </View>
          }
        </View>
        <LinearButton
          title={'GO'}
          onPress={handleSearch}
        />
        <FlatList
          data={teachers}
          renderItem={renderTeacher}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: '8%',
    paddingTop: '10%',
    flex: 1,
  },
  bottomSection: {
    flex: 13,
    paddingHorizontal: '8%'
  },
  completeInput: {
    flexDirection: 'row',
    marginBottom: 17,
    borderBottomWidth: 1,
    borderColor: THEME.colors.middleGray,
    backgroundColor: THEME.colors.bg
  },
  icon: {
    justifyContent: 'center',
    paddingLeft: 5
  },
  input: {
    backgroundColor: THEME.colors.bg,
    borderRadius: 5,
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: THEME.colors.gray,
    width: '95%'
  },
  suggestions: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    top: 37,
    zIndex: 99,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  suggestion: {
    color: THEME.colors.gray,
    padding: 5
  }
})