import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { setLanguageAction } from '../redux/app';
import { THEME } from '../styles/theme.style';
import { LANGS } from '../constants/global'

export const LanguageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { lang } = useSelector(s => s.app);

  const handleSelectLanguage = (lang) => {
    console.log('lang', lang)
    i18n.changeLanguage(lang)
    dispatch(setLanguageAction(lang))
    AsyncStorage.setItem('current_lng', lang)
  }

  const displayLanguages = () => LANGS.map((item, index) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={()=>handleSelectLanguage(item.value)}
      key={index}
      style={item.value === lang ? styles.currentLang : styles.classicLang}
    >
      <View style={styles.lang} key={index}>
        <Image style={styles.img} source={item.uri} />
        <View style={styles.langRight}>
          <Text style={styles.langTitle}>{item.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ))

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
        <Text style={styles.title}>{t('language.title')}</Text>
        <ScrollView>
          {displayLanguages()}
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
  title: {
    color: THEME.colors.gray,
    alignSelf:'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lang: {
    flexDirection: 'row',
    paddingVertical: 15,
    marginHorizontal: '8%'
  },
  img: {
    width: 50,
    height: 30,
    borderRadius:7
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