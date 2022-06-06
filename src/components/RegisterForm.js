
import React, { createRef, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
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
import { GENDER } from '../constants/global';
import { register } from '../queries/AuthQuery';

export const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false)
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    type: 'student'
  })

  inputRefs.current = [0, 0, 0, 0].map(
    (ref, index) => inputRefs.current[index] = createRef()
  )

  const onSubmit = async () => {
    setIsLoading(true)
    const result = await register(form)
    if (result) {
      setIsLoading(false)
      if (result.token) {
        dispatch(setUserAction({...result, hasAddress: false}))
      } else {
        setResponse(result)
      }
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
      <View style={styles.completeInput}>
        <View style={styles.icon}>
          <ProfileIcon size={20} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="sentences"
          placeholder={t('register.form.lastname')}
          defaultValue={form.lastname}
          placeholderTextColor="#666666"
          returnKeyType="next"
          onSubmitEditing={() => {
            inputRefs.current[0].current.focus();
          }}
          blurOnSubmit={false}
          onChangeText={(lastname) => setForm({ ...form, lastname })}
        />
      </View>
      {(response.lastname) &&
        <Text style={styles.error}>{response.lastname}</Text>
      }
      <View style={styles.completeInput}>
        <View style={styles.icon}>
          <ProfileIcon size={20} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="sentences"
          placeholder={t('register.form.firstname')}
          defaultValue={form.firstname}
          placeholderTextColor="#666666"
          returnKeyType="next"
          ref={inputRefs.current[0]}
          onSubmitEditing={() => {
            inputRefs.current[1].current.focus();
          }}
          blurOnSubmit={false}
          onChangeText={(firstname) => setForm({ ...form, firstname })}
        />
      </View>
      {(response.firstname) &&
        <Text style={styles.error}>{response.firstname}</Text>
      }
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsOpen(!isOpen)}
          style={styles.completeInput}
        >
          <View style={styles.icon}>
            <ProfileIcon size={20} />
          </View>
          <View style={styles.select}>
            <Text style={styles.selectTitle}>{form.sexe ? t('register.form.' + GENDER[form.sexe]) : t('register.form.sex')}</Text>
            <ChevronBottomIcon color='#666666' size={20} />
          </View>
        </TouchableOpacity>
        {isOpen &&
          <View style={styles.options}>
            <TouchableOpacity
              style={{ padding: 10 }}
              activeOpacity={0.5}
              onPress={() => handleSelectGender('m')}
            >
              <Text style={styles.option}>{t('register.form.male')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10 }}
              activeOpacity={0.5}
              onPress={() => handleSelectGender('f')}
            >
              <Text style={styles.option}>{t('register.form.female')}</Text>
            </TouchableOpacity>
          </View>
        }
        {(response.sexe) &&
          <Text style={styles.error}>{response.sexe}</Text>
        }
      </View>
      <View style={styles.completeInput}>
        <View style={styles.icon}>
          <EmailIcon size={20} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder={t('register.form.email')}
          defaultValue={form.email}
          keyboardType={'email-address'}
          placeholderTextColor="#666666"
          returnKeyType="next"
          ref={inputRefs.current[1]}
          onSubmitEditing={() => {
            inputRefs.current[2].current.focus();
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
          returnKeyType="next"
          placeholder={t('register.form.password')}
          defaultValue={form.password}
          secureTextEntry
          ref={inputRefs.current[2]}
          onSubmitEditing={() => {
            inputRefs.current[3].current.focus();
          }}
          blurOnSubmit={false}
          onChangeText={(password) => setForm({ ...form, password })}
        />
      </View>
      {(response.password) &&
        <Text style={styles.error}>{response.password}</Text>
      }
      <View style={styles.completeInput}>
        <View style={styles.icon}>
          <LockIcon size={20} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#666666"
          placeholder={t('register.form.repeat')}
          secureTextEntry
          defaultValue={form.repeat_password}
          ref={inputRefs.current[3]}
          onChangeText={(repeat_password) => setForm({ ...form, repeat_password })}
        />
      </View>
      {(response.repeat_password) &&
        <Text style={styles.error}>{response.repeat_password}</Text>
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
  select: {
    backgroundColor: THEME.colors.bg,
    borderRadius: 5,
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: THEME.colors.gray,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20
  },
  selectTitle: {
    color: THEME.colors.gray
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  options: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    top: 37,
    zIndex: 99,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
  option: {
    color: THEME.colors.gray
  },
  error: {
    color: THEME.colors.error
  }
})