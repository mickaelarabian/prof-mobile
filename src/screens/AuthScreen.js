import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearButton } from '../components/LinearButton';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton'
import { THEME } from '../styles/theme.style';

export const AuthScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <LanguageButton/>
      </View>

      <View style={styles.bottomSection}>
        <LinearButton
          onPress={() => navigation.push(Routes.Login)}
          title={t('login.button')}
        />
        <LinearButton
          title={t('register.button')}
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          onPress={() => navigation.push(Routes.Register)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    padding: '8%',
    paddingTop: '10%',
    justifyContent: 'center'
  },
  topSection: {
    flex: 2
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})