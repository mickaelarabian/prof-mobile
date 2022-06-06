import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton';
import { LinearButton } from '../components/LinearButton';
import { resetUserAction } from '../redux/user';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Text style={{ color: 'red' }}>Mickael Arabian</Text>
        <LinearButton
          title={t('profile.profile')}
        />
        <LinearButton
          title={t('profile.payment')}
        />
        <LinearButton
          title={t('profile.reset')}
        />
        <LinearButton
          title={t('profile.logout')}
          onPress={() => dispatch(resetUserAction())}
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
  topSection: {
    flex: 1
  },
  bottomSection: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
})