import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { setLanguageAction } from '../redux/app';
import { THEME } from '../styles/theme.style';
import { LANGS } from '../constants/global'
import { addPaymentDefault, generateIntent } from '../queries/PaymentQuery';
import { CardField, presentApplePay, useStripe } from '@stripe/stripe-react-native'
import { Input } from '../components/Input';
import { ProfileIcon } from '../components/svgs/Profile';
import { LinearButton } from '../components/LinearButton';
import { Title } from '../components/Title';
import { CardIcon } from '../components/svgs/Card';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { env } from '../../app.config';

export const NewCardScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { confirmSetupIntent, initPaymentSheet, createPaymentMethod, presentPaymentSheet } = useStripe();
  const { lang } = useSelector(s => s.app);
  const [typedCard, setTypedCard] = useState({});
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (typedCard.complete && name) {
      setIsLoading(true)
      const intent = await generateIntent()
      const billingDetails = {
        name
      }

      const { setupIntent, error: setupIntentError } = await confirmSetupIntent(intent.client_secret, {
        type: 'Card',
        billingDetails,
      })
      if (!setupIntentError && setupIntent) {
        const res = await addPaymentDefault(setupIntent.paymentMethodId)
        if (res) {
          setIsLoading(false)
          if (res.data) {
            
            route.params.fetchPayments()
            navigation.goBack()
          }
        }
      } else {
        toastError(setupIntentError?.localizedMessage)
      }
    } else {
      toastError('Veuillez compléter tous les champs')
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
        <Title title={t('newcard.title')} />
        <View style={styles.cardField}>
          <View style={styles.cardInput}>
            <CardField
              placeholder={{
                number: '4242 4242 4242 4242'
              }}
              cardStyle={{
                backgroundColor:THEME.colors.bg,
                borderColor: '#E8E8E8',
                borderWidth: 0,
                textErrorColor:'red',
                cursorColor:'red',
                textColor: THEME.colors.gray,
                placeholderColor: THEME.colors.gray,
                fontSize: 14,
              }}
              style={{
                width: '100%',
                height: 45
              }}
              postalCodeEnabled={false}
              onCardChange={(cardDetails) => setTypedCard(cardDetails)}
            />
          </View>
          <Input
            placeholder={t('newcard.holder')}
            onChangeText={(name) => setName(name)}
          >
            <ProfileIcon size={20} />
          </Input>
          <LinearButton
            title={t('newcard.add')}
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </View>
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
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50
  },
  inputFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardInput: {
    borderBottomWidth: 1,
    borderColor: THEME.colors.middleGray,
    marginBottom: 10,
    backgroundColor:THEME.colors.white
  }
})