import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { LinearButton } from '../components/LinearButton';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../components/LanguageButton'
import { THEME } from '../styles/theme.style';

export const AuthScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <Image
          source={require('../assets/logo.png')}
          style={{
            width:50,
            height:50
          }}
        />
        <LanguageButton/>
      </View>
      <View style={styles.content}>
        <Image
        source={require('../assets/hero.png')}
        style={styles.img}
        />
        <Text style={styles.title}>MasterClassRoom</Text>
      </View>
      <View style={styles.bottomSection}>
        <LinearButton
          onPress={() => navigation.push(Routes.Login)}
          title={t('login.button')}
        />
        <LinearButton
          title={t('register.button')}
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          onPress={() => navigation.push(Routes.Register)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: '10%',
    justifyContent: 'center',
    backgroundColor: THEME.colors.white
  },
  topSection: {
    paddingHorizontal: '8%',
    // flex: 2
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  bottomSection: {
    paddingHorizontal: '8%',
    paddingBottom:'8%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  img: {
    width:'90%',
    height:'47%'
  },
  title: {
    fontWeight: '400',
    fontSize:24,
    color: THEME.colors.primary
  }
})