import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { setLanguageAction } from '../redux/app';
import { OfflineRouter } from './OfflineRouter';
import { OnlineRouter } from './OnlineRouter';

export const AppRouter = ({ theme }) => {
  const navigationRef = createRef();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const user = useSelector(s => s.user);

  const reloadLang = async () => {
    const lang = await AsyncStorage.getItem('current_lng');
    if (lang) {
      i18n.changeLanguage(lang)
      dispatch(setLanguageAction(lang))
    }
  }
  useEffect(() => {
    reloadLang()
  }, [])

  return (
    <NavigationContainer theme={theme} ref={navigationRef} >
      {user.isAuthenticated ?
        <OnlineRouter />
        :
        <OfflineRouter />
      }
    </NavigationContainer>
  )
}