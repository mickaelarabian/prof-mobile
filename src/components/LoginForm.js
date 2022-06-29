
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { THEME } from '../styles/theme.style';
import { ArrowRightIcon } from './svgs/ArrowRight';
import { setUserAction } from '../redux/user';
import { LockIcon } from './svgs/Lock';
import { EmailIcon } from './svgs/Email';
import { LinearButton } from './LinearButton';
import { login } from '../queries/AuthQuery';
import { apiClient } from '../utils/axiosClient.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from './Input';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../constants/routes';
import { getMyRooms } from '../queries/ChatQuery';
import { setRoomsAction } from '../redux/chat';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: 'mickaelarabian@gmail.com',
    password: '123'
  })

  const onSubmit = async () => {
    if(form.email && form.password){
      setIsLoading(true)
      console.log('rec')
      const result = await login(form)
      if (result) {
        console.log('ok')
        console.log(result)
        setIsLoading(false)
        if (result.token) {
          AsyncStorage.setItem('user_token', result.token)
          apiClient.defaults.headers.common.Authorization = `Bearer ${result.token}`;
          toastSuccess('Vous êtes bien connecté !')
          dispatch(setUserAction({ ...result, hasAddress: true }))
          //get rooms
          const rooms = await getMyRooms()
          if(rooms){
            dispatch(setRoomsAction(rooms))
          }
        } else {
          setResponse(result)
          if(response.error){
            toastError(response.error)
          }
        }
      }
    } else {
      toastError('Veuillez compléter tous les champs')
    }
  }

  return (

    <View style={styles.form}>
      <Text style={styles.title}>{t('login.title')}</Text>
      <Text style={styles.subTitle}>{t('login.subTitle')}</Text>
      <Input
        placeholder={t('register.form.email')}
        defaultValue={form.email}
        returnKeyType="next"
        keyboardType={'email-address'}
        onSubmitEditing={() => {
          inputRef.current.focus();
        }}
        onChangeText={(email) => setForm({ ...form, email })}
      >
        <EmailIcon size={20} />
      </Input>

      {(response.email) &&
        <Text style={styles.error}>{response.email}</Text>
      }
      <Input
        placeholder={t('register.form.password')}
        secureTextEntry
        defaultValue={form.password}
        inputRef={inputRef}
        onChangeText={(password) => setForm({ ...form, password })}
        marginBottom={0}
      >
        <LockIcon size={20} />
      </Input>
      {(response.password) &&
        <Text style={styles.error}>{response.password}</Text>
      }
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.push(Routes.Forgot)}
      >
        <Text style={styles.forget}>{t('login.forgot')}</Text>
      </TouchableOpacity>
      <View style={styles.btnArea}>
        <LinearButton
          disabled={isLoading}
          title={t('login.button')}
          width='47%'
          alignSelf='flex-end'
          textTransform='uppercase'
          onPress={onSubmit}
        >
          <ArrowRightIcon />
        </LinearButton>
      </View>
      {isLoading &&
        <ActivityIndicator
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
          size={'large'} color={THEME.colors.primary}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 5,
    justifyContent: 'center',
    padding: '8%'
  },
  title: {
    color: THEME.colors.black,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subTitle: {
    color: THEME.colors.blueGray,
    marginBottom: 25
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  error: {
    color: THEME.colors.error
  },
  forget: {
    alignSelf: 'flex-end',
    color: THEME.colors.primary,
    marginBottom: 10,
    fontSize: 13
  }
})