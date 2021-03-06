import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../constants/routes';
import { THEME } from '../styles/theme.style';
import { LANGSOBJ } from '../constants/global';

export const LanguageButton = ({disabled = false}) => {
  const { lang } = useSelector(s => s.app);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.button}
      disabled={disabled}
      onPress={() => navigation.push(Routes.Language)}
    >
      <Image style={styles.img} source={LANGSOBJ[lang]} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 25,
    borderRadius: 7,
    backgroundColor: THEME.colors.lightGray
  },
  img: {
    borderRadius: 7,
    width: '100%',
    height: '100%'
  }
})