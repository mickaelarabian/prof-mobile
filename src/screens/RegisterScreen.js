import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next';
import { RegisterForm } from '../components/RegisterForm';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { Routes } from '../constants/routes';
import { THEME } from '../styles/theme.style';

export const RegisterScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeftIcon size={35} color={THEME.colors.gray} />
        </TouchableOpacity>
      </View>
      <RegisterForm />
      <View style={styles.bottomSection}>
        <Text style={styles.infos}>{t('register.infos')}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.replace(Routes.Login)}
        >
          <Text style={styles.link}>{t('login.button')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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