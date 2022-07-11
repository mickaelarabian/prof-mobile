import React, { createRef, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { THEME } from '../styles/theme.style';
import { ArrowRightIcon } from './svgs/ArrowRight';
import { setUserAction } from '../redux/user';
import { ProfileIcon } from './svgs/Profile';
import { LockIcon } from './svgs/Lock';
import { EmailIcon } from './svgs/Email';
import { LinearButton } from './LinearButton';
import { ChevronBottomIcon } from './svgs/ChevronBottom';
import { GENDER, GENDER_OPTIONS } from '../constants/global';
import { register } from '../queries/AuthQuery';
import { Input } from './Input';
import { Select } from './Select';
import { toastError, toastSuccess } from '../utils/toastUtils';
import DatePicker from 'react-native-date-picker'
import { formatdate } from '../utils/generalUtils';

export const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false)
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    type: 'student'
  })
  console.log(response)
  inputRefs.current = [0, 0, 0, 0].map(
    (ref, index) => inputRefs.current[index] = createRef()
  )

  const onSubmit = async () => {
    if (form.lastname && form.firstname && form.sexe && form.date && form.email && form.password && form.repeat_password) {
      setIsLoading(true)
      const result = await register(form)
      if (result) {
        setIsLoading(false)
        if (result.token) {
          console.log('oui')
          toastSuccess('Vous vous êtes bien inscrit !')
          dispatch(setUserAction({ ...result, hasAddress: false }))
        } else {
          setResponse(result)
          if (response.error) {
            toastError(response.error)
          }
        }
      }
    } else {
      toastError('Veuillez compléter tous les champs')
    }
  }

  const handleSelectGender = (sexe) => {
    setForm({
      ...form,
      sexe
    })
    setIsOpen(false)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{t('register.title')}</Text>
      <Text style={styles.subTitle}>{t('register.subTitle')}</Text>
      <Input
        autoCapitalize="sentences"
        placeholder={t('register.form.lastname')}
        defaultValue={form.lastname}
        returnKeyType="next"
        onSubmitEditing={() => {
          inputRefs.current[0].current.focus();
        }}
        onChangeText={(lastname) => setForm({ ...form, lastname })}
      >
        <ProfileIcon size={20} />
      </Input>

      {(response.lastname) &&
        <Text style={styles.error}>{response.lastname}</Text>
      }
      <Input
        autoCapitalize="sentences"
        placeholder={t('register.form.firstname')}
        defaultValue={form.firstname}
        returnKeyType="next"
        inputRef={inputRefs.current[0]}
        onSubmitEditing={() => {
          inputRefs.current[1].current.focus();
        }}
        onChangeText={(firstname) => setForm({ ...form, firstname })}
      >
        <ProfileIcon size={20} />
      </Input>

      {(response.firstname) &&
        <Text style={styles.error}>{response.firstname}</Text>
      }
      <Select
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={GENDER_OPTIONS.find(item => item.value === form.sexe)?.label}
        handleSelect={handleSelectGender}
        defaultValue={'register.form.sex'}
        options={GENDER_OPTIONS}
      >
        <ProfileIcon size={20} />
      </Select>


      {(response.sexe) &&
        <Text style={styles.error}>{response.sexe}</Text>
      }
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setOpen(true)}
      >
        <Input
          editable={false}
          defaultValue={form.date && formatdate(form.date)}
          placeholder='DD/MM/YYYY'
        >
          <LockIcon size={20} />
        </Input>
      </TouchableOpacity>
      <Input
        placeholder={t('register.form.email')}
        defaultValue={form.email}
        keyboardType={'email-address'}
        returnKeyType="next"
        inputRef={inputRefs.current[1]}
        onSubmitEditing={() => {
          inputRefs.current[2].current.focus();
        }}
        onChangeText={(email) => setForm({ ...form, email })}
      >
        <EmailIcon size={20} />
      </Input>
      {(response.email) &&
        <Text style={styles.error}>{response.email}</Text>
      }
      <Input
        returnKeyType="next"
        placeholder={t('register.form.password')}
        defaultValue={form.password}
        secureTextEntry
        inputRef={inputRefs.current[2]}
        onSubmitEditing={() => {
          inputRefs.current[3].current.focus();
        }}
        onChangeText={(password) => setForm({ ...form, password })}
      >
        <LockIcon size={20} />
      </Input>
      {(response.password) &&
        <Text style={styles.error}>{response.password}</Text>
      }
      <Input
        placeholder={t('register.form.repeat')}
        secureTextEntry
        defaultValue={form.repeat_password}
        inputRef={inputRefs.current[3]}
        onChangeText={(repeat_password) => setForm({ ...form, repeat_password })}
      >
        <LockIcon size={20} />
      </Input>
      {(response.repeat_password) &&
        <Text style={styles.error}>{response.repeat_password}</Text>
      }
      <DatePicker
        modal
        open={open}
        date={form.date || new Date()}
        onConfirm={(date) => {
          setOpen(false)
          setForm({ ...form, date })
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <View style={styles.btnArea}>
        {isLoading &&
          <ActivityIndicator size={'large'} color={THEME.colors.primary} />
        }
        <LinearButton
          disabled={isLoading}
          title={t('register.button')}
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