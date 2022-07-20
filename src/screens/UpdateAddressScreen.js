import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator, ScrollView } from 'react-native'
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
import { attachAddress, getMapToken, getMyAddress, searchAddress } from '../queries/AddressQuery';
import { toastError } from '../utils/toastUtils';
import { Title } from '../components/Title';
import { Autocomplete } from '../components/Autocomplete';

export const UpdateAddressScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [address, setAddress] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mapToken, setMapToken] = useState({
    token: '',
    date: null
  })

  const fetchAddress = async () => {
    const res = await getMyAddress()
    if (res) {
      setAddress(res.address)
    }
  }

  const getToken = async () => {
    const res = await getMapToken()
    if (res) {
      setMapToken({
        token: res.accessToken,
        date: new Date()
      })
    }
  }

  const search = async () => {
    const date = new Date()
    const minutes = (date - mapToken.date) / 1000
    if (minutes > 1200) {
      getToken()
    } else {
      const response = await searchAddress(address, mapToken.token)
      if (response) {
        setSuggestions(response.results)
      }
    }
  }

  useEffect(() => {
    fetchAddress()
    getToken()
  }, [])

  useEffect(() => {
    if (address.length > 0) {
      if (response.length > 0) {
        setResponse('')
      }
      search()
    } else {
      setSuggestions([])
    }
    if (selectedAddress) {
      setSelectedAddress(null)
    }
  }, [address])

  const handleSelectAddress = (address) => {
    setSelectedAddress(address)
    setSuggestions([])
  }

  const handleSubmit = async () => {
    if (selectedAddress) {
      setIsLoading(true)
      // console.log('good', JSON.stringify(selectedAddress))
      const data = {
        address: selectedAddress.name,
        lat: selectedAddress.coordinate.latitude,
        lng: selectedAddress.coordinate.longitude,
        country: selectedAddress.country,
        city: selectedAddress.structuredAddress.locality,
        local: selectedAddress.structuredAddress.thoroughfare,
        postcode: '00000',
      }
      console.log('data', data)
      const response = await attachAddress(data)
      if (response) {
        setIsLoading(false)
        dispatch(setUserAddress())
      }
    } else {
      toastError('Veuillez compléter tous les champs')
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
        <Title title={t('address.title')} />
        <Autocomplete
          setValue={setAddress}
          defaultValue={selectedAddress?.name || address}
          suggestions={suggestions}
          handleSelectValue={handleSelectAddress}
        >
          <PositionIcon size={20} />
        </Autocomplete>

        {(response.length > 0) &&
          <Text style={styles.error}>{t(response)}</Text>
        }
        <LinearButton
          title={t('address.update')}
          onPress={handleSubmit}
        />
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
  },
  topSection: {
    // flex: 1
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: '8%'
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingTop: '10%',
  },
  title: {
    color: THEME.colors.black,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: '8%'
  },
  error: {
    color: THEME.colors.error
  }
})