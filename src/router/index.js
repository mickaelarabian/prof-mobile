import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguageAction } from '../redux/app';
import { OfflineRouter } from './OfflineRouter';
import { OnlineRouter } from './OnlineRouter';
import { setUserAction } from '../redux/user';
import { apiClient } from '../utils/axiosClient.';
import { getCurrentUser } from '../queries/AuthQuery';

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

  const fetchUser = async (token) => {
    const user = await getCurrentUser(token)
    if(user){
      console.log(user)
      if (user.error) {
        // AsyncStorage.removeItem('user_token')
        //TODO
      } else {
        const data = {
          user,
          token
        }
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        dispatch(setUserAction({ ...data, hasAddress: true }))
      }
    }
  }
  
  const reloadUser = async () => {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      fetchUser(token)
    }
  }

  useEffect(() => {
    reloadLang()
    reloadUser()
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