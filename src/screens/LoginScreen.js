import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../components/LoginForm';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { Routes } from '../constants/routes';
import { THEME } from '../styles/theme.style';

export const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeftIcon size={35} color={THEME.colors.black} />
        </TouchableOpacity>
      </View>
      <LoginForm />
      <View style={styles.bottomSection}>
        <Text style={styles.infos}>{t('login.infos')}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.replace(Routes.Register)}
        >
          <Text style={styles.link}>{t('register.button')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center'
  },
  topSection: {
    flex: 1
  },
  bottomSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '8%',
  },
  infos: {
    color: THEME.colors.blueGray
  },
  link: {
    fontWeight: 'bold',
    color: THEME.colors.primary,
    marginLeft: 5
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingTop: '10%'
  }
})