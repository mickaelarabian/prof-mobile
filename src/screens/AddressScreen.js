import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
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
import { attachAddress, getMapToken, searchAddress } from '../queries/AddressQuery';

export const AddressScreen = ({ navigation }) => {
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

  const getToken = async () => {
    const res = await getMapToken()
    if(res){
      setMapToken({
        token: res.accessToken, 
        date: new Date()
      })
    }
  } 

  const search = async () => {
    const date = new Date()
    const minutes = (date - mapToken.date)/1000
    if(minutes > 1200){
      getToken()
    } else {
      const response = await searchAddress(address, mapToken.token)
      if (response) {
        console.log('res', JSON.stringify(response))
        setSuggestions(response.results)
      }
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

  const displaySuggestions = () => suggestions.map((item, idx) => (
    <TouchableOpacity
      key={idx}
      activeOpacity={0.5}
      onPress={() => handleSelectAddress(item)}
    >
      <Text style={styles.suggestion}>{item.name}</Text>
    </TouchableOpacity>
  ))

  const handlePass = () => {
    dispatch(setUserAddress())
  }

  const handleNext = async () => {
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
      setResponse('address.error')
    }
  }

  return (
    <View style={styles.contain}>
      <Text style={styles.title}>{t('address.title')}</Text>
      <View>
        <View style={styles.completeInput}>
          <View style={styles.icon}>
            <PositionIcon size={20} />
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="sentences"
            placeholder={t('address.title')}
            defaultValue={selectedAddress?.name || address}
            placeholderTextColor="#666666"
            onChangeText={(address) => setAddress(address)}
          />
        </View>
        {suggestions.length > 0 &&
          <View style={styles.suggestions}>
            {displaySuggestions()}
          </View>
        }
      </View>
      {(response.length > 0) &&
        <Text style={styles.error}>{t(response)}</Text>
      }
      {isLoading &&
        <ActivityIndicator size={'large'} color={THEME.colors.primary} />
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
  suggestions: {
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
  suggestion: {
    color: THEME.colors.gray,
    padding: 5
  },
  error: {
    color: THEME.colors.error
  }
})