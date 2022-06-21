import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { setLanguageAction } from '../redux/app';
import { THEME } from '../styles/theme.style';
import { LANGS } from '../constants/global'
import { getPaymentsCharges } from '../queries/PaymentQuery';
import { Title } from '../components/Title';

export const PaymentHistory = ({ navigation }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { lang } = useSelector(s => s.app);
  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    const response = await getPaymentsCharges()
    if (response) {
      setHistory(response.data)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const displayHistory = () => history.map((item, index) => (
    <View key={index}>
      <Text style={{ color: 'red' }}>{item.description}</Text>
    </View>
  ))
  console.log(history)
  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeftIcon size={35} color={THEME.colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <Title title='Historique de paiement' />
        <ScrollView>
          {displayHistory()}
        </ScrollView>
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
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingTop: '10%',
  },
  lang: {
    flexDirection: 'row',
    paddingVertical: 15,
    marginHorizontal: '8%'
  },
  img: {
    width: 50,
    height: 30,
    borderRadius: 7
  },
  langRight: {
    marginLeft: 10,
    justifyContent: 'center'
  },
  langTitle: {
    color: THEME.colors.blueGray,
  },
  classicLang: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: THEME.colors.bg,
  },
  currentLang: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: THEME.colors.green,
    backgroundColor: THEME.colors.lightGreen
  }
})