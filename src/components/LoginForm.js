
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { THEME } from '../styles/theme.style';
import { ArrowRightIcon } from './svgs/ArrowRight';
import { setUserAction } from '../redux/user';
import { LockIcon } from './svgs/Lock';
import { EmailIcon } from './svgs/Email';
import { LinearButton } from './LinearButton';
import { login } from '../queries/AuthQuery';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: 'polette.theo@hotmail.com',
    password: '123'
  })

  const onSubmit = async () => {
    setIsLoading(true)
    const result = await login(form)
    if (result) {
      console.log(result)
      setIsLoading(false)
      if (result.token) {
        dispatch(setUserAction({...result, hasAddress: true}))
      } else {
        setResponse(result)
      }
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{t('login.title')}</Text>
      <Text style={styles.subTitle}>{t('login.subTitle')}</Text>
      <View style={styles.completeInput}>
        <View style={styles.icon}>
          <EmailIcon size={20} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder={t('register.form.email')}
          defaultValue={form.email}
          placeholderTextColor="#666666"
          returnKeyType="next"
          keyboardType={'email-address'}
          onSubmitEditing={() => {
            inputRef.current.focus();
          }}
          blurOnSubmit={false}
          onChangeText={(email) => setForm({ ...form, email })}
        />
      </View>
      {(response.email) &&
        <Text style={styles.error}>{response.email}</Text>
      }
      <View style={styles.completeInput}>
        <View style={styles.icon}>
          <LockIcon size={20} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#666666"
          placeholder={t('register.form.password')}
          secureTextEntry
          defaultValue={form.password}
          ref={inputRef}
          onChangeText={(password) => setForm({ ...form, password })}
        />
      </View>
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
  completeInput: {
    flexDirection: 'row',
    marginBottom: 17,
    borderBottomWidth: 1,
    borderColor: THEME.colors.middleGray,
    backgroundColor: THEME.colors.bg
  },
  icon: {
    justifyContent: 'center',
    paddingLeft: 5
  },
  input: {
    backgroundColor: THEME.colors.bg,
    borderRadius: 5,
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: THEME.colors.gray,
    width: '95%'
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  error: {
    color: THEME.colors.error
  }
})