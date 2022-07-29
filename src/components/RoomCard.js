import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const RoomCard = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const user = useSelector(s => s.user);

  const { id, name, last_message, users } = props.item
  const myId = user.id
  const date = new Date(last_message?.created_at)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const unit = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const format = `${hours}:${minutes} ${unit}`

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.push(Routes.Room, { id })}
      activeOpacity={0.5}
    >
      <View style={styles.user}>
        <Text style={styles.letters}>{users && users.length > 2 ? name.charAt(0) : users && users.find(user => user.id !== myId)?.firstname.charAt(0)}{users && users.length < 3  && users.find(user => user.id !== myId)?.lastname.charAt(0)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.author}>{last_message ? users && users.find(user => user.id === last_message.userId)?.firstname : name} {last_message && users && users.find(user => user.id === last_message.userId)?.lastname}</Text>
        <View style={styles.sectionFlex}>
          <Text numberOfLines={1} style={styles.message}>{last_message ? last_message.type === 'text' ? last_message.content : t('chat.attachment') : t('chat.nomess')}</Text>
          <Text style={styles.date}>{last_message && format}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: '8%',
  },
  user: {
    backgroundColor: THEME.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 40,
    height: 40,
    borderWidth:1,
    borderColor:THEME.colors.lightGray
  },
  letters: {
    color: THEME.colors.darkGray
  },
  sectionFlex: {
    flexDirection: 'row',
    alignItems:'flex-end',
    // flex:1
  },
  content: {
    paddingLeft:10,
    flex:1
  },
  author: {
    color: THEME.colors.darkGray
  },
  message: {
    color: THEME.colors.gray,
    fontSize:12,
    flex:1
  },
  date: {
    color: THEME.colors.gray,
    fontSize:10,
    marginLeft:5
  }
})