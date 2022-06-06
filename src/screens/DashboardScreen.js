import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { LanguageButton } from '../components/LanguageButton';
import { resetUserAction } from '../redux/user';

export const DashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.contain}>
      <LanguageButton/>
      <Text style={{ color: 'red' }}>Dashboard</Text>
      <TouchableOpacity
        onPress={() => dispatch(resetUserAction())}
      >
        <Text style={{ color: 'blue' }}>decone</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    padding: '8%',
    paddingTop: '10%'
  }
})