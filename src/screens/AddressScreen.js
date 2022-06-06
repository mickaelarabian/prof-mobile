import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { setLanguageAction } from '../redux/app';
import { THEME } from '../styles/theme.style';
import { LANGS } from '../constants/global'
import { LinearButton } from '../components/LinearButton';
import { PositionIcon } from '../components/svgs/Position';
import { setUserAddress } from '../redux/user';

export const AddressScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [address, setAddress] = useState('')

  const handlePass = () => {
    dispatch(setUserAddress())
  }

  const handleNext = () => {

  }

  return (
    <View style={styles.contain}>
      <Text style={styles.title}>{t('address.title')}</Text>
      <View style={styles.completeInput}>
        <View style={styles.icon}>
          <PositionIcon size={20} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="sentences"
          placeholder={t('address.title')}
          defaultValue={address}
          placeholderTextColor="#666666"
          onChangeText={(address) => setAddress(address)}
        />
      </View>
      <LinearButton
        title={t('address.next')}
        onPress={handleNext}
      />
      <LinearButton
        title={t('address.pass')}
        onPress={handlePass}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    padding: '8%'
  },
  title: {
    color: THEME.colors.black,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: '8%'
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
})