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
  const [openedCard, setOpenedCard] = useState(null)

  const handleSetOpenedCard = (id) => {
    if (openedCard === id) {
      setOpenedCard(null)
    } else {
      setOpenedCard(id)
    }
  }

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

  const renderHistory = ({ item, index }) => <HistoryCard key={index} item={item} openedCard={openedCard} handleSetOpenedCard={handleSetOpenedCard} />

  console.log(JSON.stringify(history))
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
        <Title title='Historique de paiement' />
        {history && history.length > 0 ?
          <View style={styles.header}>
            <View style={styles.col2}>
              <Text style={styles.headerTitle}>Montant</Text>
            </View>
            <View style={styles.col3}>
              <Text style={styles.headerTitle}>Date</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.headerTitle}>Status</Text>
            </View>
          </View>
          :
          <Text style={styles.noDatas}>{'Aucun paiment'}</Text>
        }
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
    // flex: 1
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: '5%'
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingTop: '10%',
    paddingBottom: '3%',
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
  noDatas: {
    color: THEME.colors.darkGray,
    position: 'absolute',
    alignSelf: 'center',
    top: 70
  }
})