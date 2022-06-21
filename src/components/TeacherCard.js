import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { PositionIcon } from './svgs/Position';
import { StarIcon } from './svgs/Star';
import {useTranslation} from 'react-i18next';

export const TeacherCard = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { firstname, lastname, image, id, description, teacher_profil, address, note, teacher_subjects } = props.teacher

  const displaySubjects = () => teacher_subjects.map((item, idx) => (
    <Text key={idx} style={[styles.subject, { backgroundColor: item.subject.color }]}>{t(item.subject.libelle)}</Text>
  ))

  return (
    <TouchableOpacity
      onPress={() => navigation.push(Routes.Teacher, { id })}
      activeOpacity={0.5}
      style={[styles.card, { borderTopWidth: props.index !== 0 ? 1 : 0 }]}
    >
      <Image
        source={{ uri: image }}
        style={styles.img}
      />
      <View style={styles.contain}>
        <View style={styles.doubleSection}>
          <Text style={styles.title}>{firstname} {lastname}</Text>
          <View style={styles.sectionFlex}>
            <Text style={styles.title}>{note}</Text>
            <StarIcon size={18} color={THEME.colors.darkGray} />
          </View>
        </View>
        <View style={styles.sectionFlex}>
          <PositionIcon color={THEME.colors.darkGray} size={18} />
          <Text style={[styles.text, { marginLeft: 3 }]}>{address.city}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.doubleSection}>
          <View style={styles.subjects}>
            {displaySubjects()}
          </View>
          <View style={styles.price}>
            <Text style={styles.title}>{`${teacher_profil.currency.toUpperCase()} ${teacher_profil.rate} / H`}</Text>
          </View>
        </View>
      </View>


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderColor: THEME.colors.lightGray
  },
  contain: {
    flex: 1,
    paddingLeft: 5
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5
  },
  section: {
    // flex:1
  },
  sectionFlex: {
    flexDirection: 'row'
  },
  doubleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subjects: {
    flex: 2,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  price: {
    flex: 1
  },
  title: {
    color: THEME.colors.black,
    fontWeight: '700'
  },
  text: {
    color: THEME.colors.black,
    fontSize: 12
  },
  subject:{
    color: THEME.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
    marginRight:5,
    marginBottom:5
  }
})