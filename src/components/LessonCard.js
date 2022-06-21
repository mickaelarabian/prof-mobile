import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { CODES } from '../constants/global';

export const LessonCard = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { id, scheduled_at, relative_status, subject, teacher} = props.item

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.push(Routes.Lesson, { id })}
      activeOpacity={0.5}
    >
      <View style={styles.col3}>
        <Text style={styles.text}>{`${teacher.firstname.charAt(0)}.${teacher.lastname}`}</Text>
      </View>
      <View style={styles.col3}>
        <Text style={[styles.subject, { borderRadius: 5, backgroundColor: subject.color || THEME.colors.primary }]}>{t(subject.libelle)}</Text>
      </View>
      <View style={styles.col3}>
        <Text style={styles.text}>{scheduled_at}</Text>
      </View>
      <View style={styles.col}>
        <View style={[styles.status, { backgroundColor: CODES[relative_status.code] }]}></View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: THEME.colors.lightGray,
    paddingVertical: 15
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
  text: {
    color: THEME.colors.gray,
    fontSize: 11
  },
  subject: {
    color: THEME.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    fontWeight: '700',
    textTransform: "capitalize",
    fontSize: 10
  },
  status: {
    width: 15,
    height: 15,
    borderRadius: 25
  },
})