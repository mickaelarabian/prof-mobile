import React from 'react';
import { Text, StyleSheet } from 'react-native'
import { THEME } from '../styles/theme.style';

export const Title = ({ title = 'Title', white = false }) => (
  <Text style={[styles.title, { backgroundColor: white ? THEME.colors.white : THEME.colors.bg }]}>{title}</Text>
)

const styles = StyleSheet.create({
  title: {
    color: THEME.colors.gray,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 15
  }
})