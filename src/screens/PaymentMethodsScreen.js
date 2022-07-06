import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Text, Alert } from 'react-native'
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { THEME } from '../styles/theme.style';
import { addPaymentDefault, getPayments, removePaymentMethod } from '../queries/PaymentQuery';
import { LinearButton } from '../components/LinearButton';
import { Routes } from '../constants/routes';
import { Title } from '../components/Title';
import { CreditCard } from '../components/CreditCard';

export const PaymentMethodsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [payments, setPayment] = useState([])
  const [defaultPm, setDefaultPm] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  const fetchPayments = async () => {
    setRefreshing(true)
    const response = await getPayments()
    if (response) {
      console.log(response.default_pm)
      setPayment(response.data)
      setDefaultPm(response.default_pm)
      setRefreshing(false)
    }
  }
  // console.log(JSON.stringify(payments))
  useEffect(() => {
    fetchPayments()
  }, [])

  const onRefresh = useCallback(() => {
    fetchPayments()
  })

  const keyExtractor = useCallback(({ id }) => `payment-${id}`, []);

  const handlePress = async (id) => {
    console.log('is', id)
    const res = await addPaymentDefault(id, true)
    if (res.data) {
      fetchPayments()
    }
  }

  const renderPaymentMethod = ({ item, index }) => <CreditCard key={index} item={item} default={defaultPm} handlePress={handlePress} removeCard={removeCard} />

  const removeCard = async (id) => {
    setRefreshing(true)
    const res = await removePaymentMethod(id)
    if (res) {
      setRefreshing(false)
      if (res.data) {
        fetchPayments()
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
        <Title title={t('payment.title')} />
        <FlatList
          data={payments}
          style={{ marginBottom: 15 }}
          renderItem={renderPaymentMethod}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
        {payments.length === 0 &&
          <Text style={styles.noDatas}>Aucune carte</Text>
        }
        <LinearButton
          title={t('payment.add')}
          onPress={() => navigation.push(Routes.NewCard, { fetchPayments })}
        />
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
    // flex: 1
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: '8%',
    // paddingTop:20,
    paddingBottom: '5%'
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingBottom: '3%',
    paddingTop: '10%',
  },
  noDatas: {
    color: THEME.colors.darkGray,
    position: 'absolute',
    alignSelf: 'center',
    top: 70
  }
})