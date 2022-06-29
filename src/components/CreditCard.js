import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { CODES } from '../constants/global';
import LinearGradient from 'react-native-linear-gradient';
import { CheckCircleIcon } from './svgs/CheckCircle';

export const CreditCard = (props) => {
  const { t } = useTranslation();

  const { id, billing_details, card } = props.item

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => props.handlePress(id)}
      activeOpacity={0.5}
    >
      <LinearGradient
      colors={['#6bcbe0', '#6e8de7']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{
        padding:15,
        borderRadius: 10,
      }}
      >

        <View style={styles.sectionFlex}>
          <View>
            <Text style={styles.brand}>{card.brand}</Text>
          </View>
          <View>
            {props.default === id &&
              <CheckCircleIcon/>
            }
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>CARD NUMBER</Text>
          <Text style={styles.value}>{`**** **** **** ${card.last4}`}</Text>
        </View>
        <View style={styles.sectionFlex}>
          <View>
            <Text style={styles.title}>CARD HOLDER </Text>
            <Text style={styles.value}>{billing_details.name}</Text>
          </View>
          <View>
            <Text style={styles.title}>VALID </Text>
            <Text style={styles.value}>{`${card.exp_month} / ${card.exp_year}`}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 10
  },
  section: {
    marginBottom: 10
  },
  sectionFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    color: THEME.colors.white,
    fontSize: 10
  },
  value: {
    color: THEME.colors.white,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  brand:{
    color: THEME.colors.white,
    fontWeight:'bold',
    fontSize:22
  }
})