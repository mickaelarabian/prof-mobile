
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
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

export const LoginForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: 'mickaelarabian@gmail.com',
    password: '123'
  })

  const onSubmit = async () => {
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
        dispatch(setUserAction({ ...result, hasAddress: true }))
      } else {
        setResponse(result)
      }
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
      >
      <LockIcon size={20} />
      </Input>
      {(response.password) &&
        <Text style={styles.error}>{response.password}</Text>
      }
      {(response.error) &&
        <Text style={styles.error}>{response.error}</Text>
      }
      <View style={styles.btnArea}>
        {isLoading &&
          <ActivityIndicator size={'large'} color={THEME.colors.primary} />
        }
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
  }
})