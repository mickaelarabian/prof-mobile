import React, { useState, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, FlatList, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton';
import { THEME } from '../styles/theme.style';
import { Title } from '../components/Title';
import { RoomCard } from '../components/RoomCard';
import { setRoomsAction } from '../redux/chat';
import { getMyRooms } from '../queries/ChatQuery';

export const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const { rooms, notifications } = useSelector(s => s.chat);
  
  const keyExtractor = useCallback(({ id }) => `room-${id}`, []);

  const renderRoom = ({ item, index }) => <RoomCard key={index} item={item} />

  const fetchRooms = async () => {
    setRefreshing(true)
    const response = await getMyRooms()
    if (response) {
      dispatch(setRoomsAction(response))
      setRefreshing(false)
    }
  }

  const onRefresh = useCallback(() => {
    fetchRooms()
  }, []);

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Title title={t('chat.title')} />
        <FlatList
          data={rooms}
          renderItem={renderRoom}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
         {rooms.length === 0 && !refreshing &&
          <Text style={styles.noDatas}>{t('chat.no')}</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1
  },
  title: {
    color: THEME.colors.darkGray,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
    textTransform: 'capitalize'
  },
  topSection: {
    padding: '8%',
    paddingBottom:'7%',
    paddingTop: '10%',
  },
  bottomSection: {
    flex: 1
  },
  noDatas: {
    color: THEME.colors.darkGray,
    position: 'absolute',
    alignSelf: 'center',
    top: 70
  },
})