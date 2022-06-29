import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { CODES } from '../constants/global';

export const Message = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { id, content, created_at } = props.item
  const { firstname, lastname, isMe } = props
  return (
    <View style={[styles.message, { alignSelf: isMe ? 'flex-end' : 'flex-start' }]}>
      <View style={styles.header}>
        <Text style={styles.author}>{firstname} {lastname}</Text>
        <Text style={styles.date}>12</Text>
      </View>
      <View style={[styles.content, { backgroundColor: isMe ? THEME.colors.white : THEME.colors.primary, alignSelf: isMe ? 'flex-end' : 'flex-start' }]}>
        <Text style={[styles.text, {color: isMe ? THEME.colors.gray : THEME.colors.white }]}>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    marginTop: 10,
    marginBottom:10
  },
  content: {
    paddingVertical: 10,
    // flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius:10
  },
  header: {
    flexDirection:'row'
  },
  author: {
    color: THEME.colors.gray,
    marginBottom:5,
    fontSize:12
  },
  date: {
    color: THEME.colors.gray,
    fontSize:10
  },
  text:{
    fontSize:13
  }
})