import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton';
import { Routes } from '../constants/routes';
import { getHistoryLessons, getLessons, getUpcomingLessons } from '../queries/LessonQuery';
import { THEME } from '../styles/theme.style';
import { CODES } from '../constants/global';
import { LessonCard } from '../components/LessonCard';
import { Title } from '../components/Title';

export const LessonsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([])
  const [isHistory, setIsHistory] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [lastPage, setLastPage] = useState(1)
  const [page, setPage] = useState(1)

  const fetchUpcomingLessons = async () => {
    setRefreshing(true)
    const response = await getUpcomingLessons(page)
    if (response) {
      const data = page === 1 ? response.data : [...lessons, ...response.data]
      setLastPage(response.lastPage)
      setLessons(data)
      setRefreshing(false)
    }
  }

  const fetchHistoryLessons = async () => {
    setRefreshing(true)
    const response = await getHistoryLessons(page)
    if (response) {
      const data = page === 1 ? response.data : [...lessons, ...response.data]
      setLastPage(response.lastPage)
      setLessons(data)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    setRefreshing(true)
    if (isHistory) {
      fetchHistoryLessons()
    } else {
      fetchUpcomingLessons()
    }
    setRefreshing(false)
  }, [isHistory, page])

  const onRefresh = useCallback((isHistory) => {
    if (page !== 1) {
      setPage(1)
    } else {
      if (isHistory) {
        fetchHistoryLessons()
      } else {
        fetchUpcomingLessons()
      }
    }
  }, []);

  const handleLoadMore = () => {
    if (page < lastPage) {
      setPage(page + 1)
    }
  }

  const keyExtractor = useCallback(({ id }) => `lesson-${id}`, []);

  const renderLesson = ({ item, index }) => <LessonCard key={index} item={item} />

  const toggleHistory = (isHistory) => {
    setLessons([])
    setIsHistory(isHistory)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Title title='Vos cours' white />
        <View style={styles.tabArea}>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={!isHistory}
            onPress={() => toggleHistory(false)}
            style={[styles.tab, { borderColor: isHistory ? THEME.colors.white : THEME.colors.primary }]}
          >
            <Text style={[styles.tabTitle, { color: isHistory ? THEME.colors.blueGray : THEME.colors.primary }]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleHistory(true)}
            disabled={isHistory}
            activeOpacity={0.5}
            style={[styles.tab, { borderColor: isHistory ? THEME.colors.primary : THEME.colors.white }]}
          >
            <Text style={[styles.tabTitle, { color: isHistory ? THEME.colors.primary : THEME.colors.blueGray }]}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContain}>
          {lessons && lessons.length > 0 ?
            <>
              <View style={styles.header}>
                <View style={styles.col3}>
                  <Text style={styles.headerTitle}>Teacher</Text>
                </View>
                <View style={styles.col3}>
                  <Text style={styles.headerTitle}>Subject</Text>
                </View>
                <View style={styles.col3}>
                  <Text style={styles.headerTitle}>Scheduled At</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.headerTitle}>Status</Text>
                </View>
              </View>
            </>
            :
            <Text style={styles.noDatas}>Aucun cours</Text>}
            <FlatList
              data={lessons}
              renderItem={renderLesson}
              keyExtractor={keyExtractor}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.4}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => onRefresh(isHistory)}
                />
              }
            />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: '8%',
    paddingTop: '10%',
    flex: 1,
    backgroundColor: THEME.colors.white
  },
  bottomSection: {
    flex: 13
  },
  bottomContain: {
    paddingHorizontal: '3%',
    paddingTop: '5%',
    flex: 1
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  headerTitle: {
    color: THEME.colors.blueGray,
    fontWeight: '700',
    fontSize: 11
  },
  col: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  col3: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center'
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
  tabTitle: {
    fontSize: 15
  },
  noDatas:{
    color: THEME.colors.darkGray,
    position: 'absolute',
    alignSelf: 'center',
    top: 70
  }
})