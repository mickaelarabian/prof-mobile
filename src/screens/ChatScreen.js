import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton';
import { LinearButton } from '../components/LinearButton';
import { THEME } from '../styles/theme.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routes } from '../constants/routes';
import { toastSuccess } from '../utils/toastUtils';
import { Title } from '../components/Title';
import { RoomCard } from '../components/RoomCard';
import { resetNotificationsAction } from '../redux/chat';

export const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { rooms, notifications } = useSelector(s => s.chat);
  console.log('rooms', rooms)

  const keyExtractor = useCallback(({ id }) => `room-${id}`, []);

  const renderRoom = ({item, index}) => <RoomCard key={index} item={item} />  

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Title title='Chat' />
        <FlatList
          data={rooms}
          renderItem={renderRoom}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    padding: '8%',
    paddingTop: '10%',
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
    flex: 1
  },
  bottomSection: {
    flex: 7,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
})