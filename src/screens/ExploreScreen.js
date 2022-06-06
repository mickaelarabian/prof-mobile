import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { LanguageButton } from '../components/LanguageButton';

export const ExploreScreen = () => {
  return (
    <View style={styles.contain}>
      <LanguageButton/>
      <Text style={{ color: 'red' }}>Explore</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    padding: '8%',
    paddingTop: '10%'
  }
})