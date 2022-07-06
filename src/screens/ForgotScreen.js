import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, ActivityIndicator } from "react-native"
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { THEME } from '../styles/theme.style';
import { Input } from '../components/Input';
import { LinearButton } from '../components/LinearButton';
import { EmailIcon } from '../components/svgs/Email';
import { toastError } from '../utils/toastUtils';
import { resetpassword } from '../queries/AuthQuery';

export const ForgotScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if(email){
      setIsLoading(true)
      console.log("boom")
      const res = await resetpassword(email)
      if(res){
        console.log('res',res)
        setIsLoading(false)
        if(res.data){
          navigation.goBack()
        }
      }
    } else {
      toastError('Saisissez votre email pour continuer')
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
        <Text style={styles.title}>{t('reset.title')}</Text>
        <Text style={styles.subTitle}>{t('reset.subTitle')}</Text>
        <Input
          placeholder={t('register.form.email')}
          defaultValue={email}
          keyboardType={'email-address'}
          onChangeText={(email) => setEmail(email)}
        >
          <EmailIcon size={20} />
        </Input>

        <LinearButton
          title={t('reset.title')}
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
  topSection: {
    // flex: 1
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingTop: '10%'
  },
  bottomSection: {
    flex: 1,
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
})