import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { CODES } from '../constants/global';

export const RoomCard = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { id, name, last_message } = props.item

  const date = new Date(last_message.created_at)
  console.log(date)
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.push(Routes.Room, { id })}
      activeOpacity={0.5}
    >
     <Text style={{color:'red'}}>{name}</Text>
     <Text style={{color:'red'}}>4h</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: THEME.colors.lightGray,
    paddingVertical: 15,
    paddingHorizontal: '3%'
  }
})