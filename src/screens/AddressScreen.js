import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { THEME } from '../styles/theme.style';
import { LinearButton } from '../components/LinearButton';
import { PositionIcon } from '../components/svgs/Position';
import { setUserAddress } from '../redux/user';
import { attachAddress, getMapToken, searchAddress } from '../queries/AddressQuery';
import { toastError } from '../utils/toastUtils';
import { Autocomplete } from '../components/Autocomplete';
import { setMapTokenAction } from '../redux/app';

export const AddressScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { mapToken } = useSelector(s => s.app);
  const { t } = useTranslation();
  const [address, setAddress] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getToken = async () => {
    const date = new Date().getTime()
    const minutes = (date - mapToken.date) / 1000
    if (minutes > 1200) {
      const res = await getMapToken()
      if (res) {
        dispatch(setMapTokenAction({
          token: res.accessToken,
          date: new Date().getTime()
        }))
      }
    }
  }

  const search = async () => {
    getToken()
    const response = await searchAddress(address, mapToken.token)
    if (response) {
      setSuggestions(response.results)
    }
  }

  useEffect(() => {
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

  const handlePass = () => {
    dispatch(setUserAddress())
  }

  const handleNext = async () => {
    if (selectedAddress) {
      setIsLoading(true)
      const data = {
        address: selectedAddress.name,
        lat: selectedAddress.coordinate.latitude,
        lng: selectedAddress.coordinate.longitude,
        country: selectedAddress.country,
        city: selectedAddress.structuredAddress.locality,
        local: selectedAddress.structuredAddress.thoroughfare,
        postcode: '00000',
      }
      const response = await attachAddress(data)
      if (response) {
        setIsLoading(false)
        if (response.data) {
          dispatch(setUserAddress())
        }
      }
    } else {
      toastError('address.error')
    }
  }

  return (
    <View style={styles.contain}>
      <Text style={styles.title}>{t('address.title')}</Text>
      <Autocomplete
        defaultValue={selectedAddress?.name || address}
        setValue={setAddress}
        handleSelectValue={handleSelectAddress}
        suggestions={suggestions}
      >
        <PositionIcon size={20} />
      </Autocomplete>
      {(response.length > 0) &&
        <Text style={styles.error}>{t(response)}</Text>
      }
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
      <LinearButton
        title={t('address.next')}
        onPress={handleNext}
      />
      <LinearButton
        title={t('address.skip')}
        primary={THEME.colors.white}
        secondary={THEME.colors.white}
        color={THEME.colors.primary}
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
  error: {
    color: THEME.colors.error
  }
})