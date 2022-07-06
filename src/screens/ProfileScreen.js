import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton';
import { LinearButton } from '../components/LinearButton';
import { resetUserAction } from '../redux/user';
import { THEME } from '../styles/theme.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routes } from '../constants/routes';
import { toastSuccess } from '../utils/toastUtils';
import { resetAction } from '../redux/chat';
import { useSocket } from '../hooks/useSocket';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector(s => s.user);
  const { closeSocket } = useSocket()

  
  const handleLogout = () => {
    AsyncStorage.removeItem('user_token')
    dispatch(resetUserAction())
    dispatch(resetAction())
    closeSocket()
    toastSuccess('Vous êtes bien déconnecté')
  }

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <LanguageButton />
      </View>
      <View style={styles.bottomSection}>
        <Image
          source={{ uri: user?.image }}
          style={styles.img}
        />
        <Text style={styles.title}>{user?.firstname} {user?.lastname}</Text>
        <LinearButton
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          title={t('profile.profile')}
          onPress={() => navigation.push(Routes.ProfileInfos)}
        />
        <LinearButton
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          title={t('profile.methods')}
          onPress={() => navigation.push(Routes.PaymentMethods)}
        />
        <LinearButton
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          title={t('profile.payments')}
          onPress={() => navigation.push(Routes.PaymentHistory)}
        />
        <LinearButton
          title={t('profile.logout')}
          onPress={handleLogout}
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
  title: {
    color: THEME.colors.darkGray,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
    textTransform: 'capitalize'
  },
  topSection: {
    flex: 1
  },
  bottomSection: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 100,
    backgroundColor: THEME.colors.noPic
  }
})