import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { THEME } from '../styles/theme.style';
import { getPaymentsCharges } from '../queries/PaymentQuery';
import { Title } from '../components/Title';
import { HistoryCard } from '../components/HistoryCard';

export const PaymentHistoryScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async () => {
    setRefreshing(true)
    const response = await getPaymentsCharges()
    if (response) {
      setHistory(response.data)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const onRefresh = useCallback(() => {
    fetchHistory()
  })

  const keyExtractor = useCallback(({ id }) => `history-${id}`, []);

  const renderHistory = ({item, index}) => <HistoryCard key={index} item={item} />

  console.log(JSON.stringify(history[0]))
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
        <View style={styles.header}>
          <View style={styles.col}>
            <Text style={styles.headerTitle}>Montant</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.headerTitle}>Date</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.headerTitle}>Status</Text>
          </View>
        </View>
        <FlatList
          data={history}
          renderItem={renderHistory}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
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
    flex: 1
  },
  bottomSection: {
    flex: 7,
    paddingHorizontal: '5%'
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingTop: '10%',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: '3%'
  },
  headerTitle: {
    color: THEME.colors.blueGray,
    fontWeight: '700',
    fontSize: 11
  },
  col: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },

})