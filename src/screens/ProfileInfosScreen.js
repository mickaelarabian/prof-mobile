import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { setLanguageAction } from '../redux/app';
import { THEME } from '../styles/theme.style';
import { GENDER_OPTIONS, LANGS } from '../constants/global'
import { EmailIcon } from '../components/svgs/Email';
import { LinearButton } from '../components/LinearButton';
import { Input } from '../components/Input';
import { ProfileIcon } from '../components/svgs/Profile';
import { LockIcon } from '../components/svgs/Lock';
import { Select } from '../components/Select';
import { updateAvatar, updateCurrentUser } from '../queries/UserQuery';
import { Title } from '../components/Title';
import { getCurrentUser } from '../queries/AuthQuery';
import { setUserAction } from '../redux/user';
import { Routes } from '../constants/routes';
import { getMyAddress } from '../queries/AddressQuery';
import { PositionIcon } from '../components/svgs/Position';

export const ProfileInfosScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user, token } = useSelector(s => s.user);
  const [form, setForm] = useState(user)
  const [image, setImage] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
console.log("user", user)
  const handleSelectGender = (sexe) => {
    setForm({
      ...form,
      sexe
    })
    setIsOpen(false)
  }

  const fetchAddress = async () => {
    const res = await getMyAddress()
    if(res){
      setAddress(res.address)
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType:'photo', includeBase64:true }, async (response) => {
      if (response.assets) {
        setIsLoading(true)
        const res = await updateAvatar(response.assets[0])
        if(res){
          setIsLoading(false)
          console.log('netoyage', res)
          const user = await getCurrentUser(token)
          if(user){
            const data = {
              user,
              token
            }
            dispatch(setUserAction({ ...data, hasAddress: true }))
          }
        }
      }
    });
  };

  const handleSubmit = async () => {
    const response = await updateCurrentUser(form)
    if(response){
      console.log(user)
      const user = await getCurrentUser(token)
      if(user){
        const data = {
          user,
          token
        }
        dispatch(setUserAction({ ...data, hasAddress: true }))
        setForm(current => {
          const {password, repeat_password, ...form} = current;
          return form;
        })
      }
    }
  }

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeftIcon size={35} color={THEME.colors.gray} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <Title title={t('profile.title')} />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleChoosePhoto}
        >
          <Image
            source={{ uri: user.image }}
            style={styles.img}
          />
        </TouchableOpacity>
        <Input
          autoCapitalize="sentences"
          placeholder={t('register.form.lastname')}
          defaultValue={form.lastname}
          onChangeText={(lastname) => setForm({ ...form, lastname })}
        >
          <ProfileIcon size={20} />
        </Input>
        <Input
          autoCapitalize="sentences"
          placeholder={t('register.form.firstname')}
          defaultValue={form.firstname}
          returnKeyType="next"
          onChangeText={(firstname) => setForm({ ...form, firstname })}
        >
          <ProfileIcon size={20} />
        </Input>
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
        <Input
          placeholder={t('register.form.email')}
          defaultValue={form.email}
          keyboardType={'email-address'}
          editable={false}
          onChangeText={(email) => setForm({ ...form, email })}
        >
          <EmailIcon size={20} />
        </Input>
        <Input
          placeholder={t('address.title')}
          defaultValue={address}
          editable={false}
          placeholderTextColor={THEME.colors.blueGray}
        >
          <PositionIcon size={20} />
        </Input>
        <Input
          returnKeyType="next"
          placeholder={t('register.form.password')}
          defaultValue={form.password}
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        >
          <LockIcon size={20} />
        </Input>
        <Input
          placeholder={t('register.form.repeat')}
          secureTextEntry
          defaultValue={form.repeat_password}
          onChangeText={(repeat_password) => setForm({ ...form, repeat_password })}
        >
          <LockIcon size={20} />
        </Input>
        <LinearButton
          title={t('profile.save')}
          onPress={handleSubmit}
        />
        <LinearButton
          title={t('profile.address')}
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          onPress={() => navigation.navigate(Routes.NewAddress)}
        />
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
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center'
  },
  topSection: {
    flex: 1
  },
  bottomSection: {
    flex: 7,
    paddingHorizontal: '8%'
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingTop: '10%'
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
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius:100,
    backgroundColor: THEME.colors.noPic,
    borderWidth:1,
    borderColor: THEME.colors.primary
  }
})