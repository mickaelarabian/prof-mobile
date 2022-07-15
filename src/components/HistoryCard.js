import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { CODES } from '../constants/global';
import { formatdateTime } from '../utils/generalUtils';
import { FileIcon } from './svgs/File';

export const HistoryCard = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { id, amount, currency, refunded, disputed, created, receipt_url, description } = props.item
  const { openedCard, handleSetOpenedCard } = props

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleSetOpenedCard(id)}
        activeOpacity={0.5}
      >
        <View style={styles.col2}>
          <Text style={styles.text}>{`${amount / 100} ${currency.toUpperCase()}`}</Text>
        </View>
        <View style={styles.col3}>
          <Text style={styles.text}>{formatdateTime(created, true)}</Text>
        </View>
        <View style={styles.col2}>
          <Text style={[styles.status, { backgroundColor: CODES[refunded ? 'refunded' : disputed ? 'disputed': 'paied'] }]}>{t(refunded ? 'status.refunded' : disputed ? 'status.disputed': 'status.paied')}</Text>
        </View>
      </TouchableOpacity>
      {openedCard === id &&
        <View style={styles.openedArea}>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.billBtn}
            onPress={() => Linking.openURL(receipt_url)}
          >
            <Text style={styles.billText}>{t('history.open')}</Text>
            <FileIcon size={18} color={THEME.colors.white} />
          </TouchableOpacity>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: THEME.colors.lightGray,
    paddingVertical: 10,
    paddingHorizontal: '2%'
  },
  col2: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  col3: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  text: {
    color: THEME.colors.gray,
    fontSize: 11
  },
  status: {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    fontWeight: '700',
    textTransform: "capitalize",
    fontSize: 11
  },
  openedArea:{
    paddingBottom: 10,
    paddingHorizontal: '2%',
    // flexDirection:'row'
  },
  description: {
    color: THEME.colors.gray,
    fontSize: 12,
  },
  billBtn: {
    backgroundColor: THEME.colors.primary,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: 15,
    paddingVertical:5,
    borderRadius:25,
    alignSelf:'flex-end'
  },
  billText: {
    color: THEME.colors.white,
    fontSize: 11,
    paddingRight:5
  }
})