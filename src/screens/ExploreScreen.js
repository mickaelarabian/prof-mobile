import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { LanguageButton } from '../components/LanguageButton';
import { LinearButton } from '../components/LinearButton';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjects } from '../queries/SubjectQuery';
import { THEME } from '../styles/theme.style';
import { useTranslation } from 'react-i18next';
import { getTeachers } from '../queries/TeacherQuery';
import { TeacherCard } from '../components/TeacherCard';
import { Title } from '../components/Title';
import { FilterModal } from '../components/FilterModal';
import { setSubjectsAction } from '../redux/app';

export const ExploreScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedSubject, searchedName, selectedDate, selectedPreference } = useSelector(s => s.app);

  const fetchSubjects = async () => {
    const response = await getSubjects()
    if (response) {
      let subjects = []
      response.map(item => {
        subjects = [...subjects, {
          label: item.libelle,
          value: item.id
        }]
      })
      dispatch(setSubjectsAction(subjects))
    }
  }

  useEffect(() => {
    fetchSubjects()
    handleSearch()
  }, [selectedSubject, searchedName, selectedDate, selectedPreference])

  const handleSearch = async () => {
    setRefreshing(true)
    const response = await getTeachers(selectedSubject, selectedPreference, JSON.parse(selectedDate), searchedName)
    if (response) {
      setRefreshing(false)
      setTeachers(response.data)
    }
  }

  const keyExtractor = useCallback(({ id }) => `teacher-${id}`, []);

  const renderTeacher = ({ item, index }) => <TeacherCard key={index} teacher={item} index={index} />

  const onRefresh = useCallback(() => {
    handleSearch()
  }, []);

  const toggleModal = () => {
    setIsOpen(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Title title={t('explore.title')} />
        {/* <View>
          <View style={styles.completeInput}>
            <View style={styles.icon}>
              <PositionIcon size={20} />
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="sentences"
              placeholder={t('explore.search')}
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
          title={t('explore.research')}
          onPress={handleSearch}
        /> */}
        {teachers.length === 0 && !refreshing &&
          <Text style={styles.noDatas}>{t('explore.no')}</Text>
        }
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
        <View style={styles.filter}>
          <LinearButton
            title={t('explore.advanced')}
            // primary={THEME.colors.white}
            // secondary={THEME.colors.white}
            // color={THEME.colors.primary}
            onPress={()=>setIsOpen(true)}
          />
        </View>
        {isOpen &&
          <FilterModal toggleModal={toggleModal} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: '8%',
    paddingTop: '10%',
    // flex: 1,
  },
  bottomSection: {
    flex: 1,
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
  },
  noDatas: {
    color: THEME.colors.darkGray,
    // position: 'absolute',
    alignSelf: 'center',
    // top: 70
  },
  filter: {
    position: 'absolute',
    bottom: 0,
    left: '8%',
    right: '8%'
  },
})