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
import { CardField, useStripe } from '@stripe/stripe-react-native'
import { Input } from '../components/Input';
import { ProfileIcon } from '../components/svgs/Profile';
import { LinearButton } from '../components/LinearButton';
import { Title } from '../components/Title';

export const NewCardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { lang } = useSelector(s => s.app);
  const [history, setHistory] = useState([])
  const [typedCard, setTypedCard] = useState({});

  const fetchHistory = async () => {
    const response = await getPaymentsCharges()
    if (response) {
      setHistory(response)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const displayHistory = () => history.map((item, index) => (
    <View>

    </View>
  ))

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
        <Title title='Nouvelle carte' />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.cardField}>
            <CardField
              postalCodeEnabled={false}
              // placeholders={{
              //   number: '4242 4242 4242 4242',
              // }}
              cardStyle={{
                backgroundColor: THEME.colors.bg,
                placeholderColor: THEME.colors.blueGray,
                borderColor: THEME.colors.bg,
                borderWidth: 1,
                textColor: '#686868'
              }}
              style={{
                width: '100%',
                height: 45,
              }}
              onCardChange={(cardDetails) => setTypedCard(cardDetails)}
            />
          </View>
          <Input
            placeholder='Nom du titulaire'
            defaultValue=''
          // onChangeText={(password) => setForm({ ...form, password })}
          >
            <ProfileIcon size={20} />
          </Input>
          <LinearButton
            title='Ajouter'
          />
        </View>
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
    paddingTop: '10%',
  },
  cardField: {
    borderBottomWidth: 1,
    borderColor: THEME.colors.middleGray,
    marginBottom: 10,
  }
})