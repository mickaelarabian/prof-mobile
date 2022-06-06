import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { THEME } from '../styles/theme.style';

export const LinearButton = ({ activeOpacity = 0.5, onPress, title = 'Button', width = '100%', children, alignSelf = 'center', textTransform = 'none', disabled = false }) => {

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={{ width, alignSelf }}
      onPress={onPress}
    >
      <LinearGradient colors={[THEME.colors.primary, THEME.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
        <Text style={[styles.title, { textTransform }]}>{title}</Text>
        <View style={styles.icon}>
          {children}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    marginLeft: 5
  },
  title: {
    color: THEME.colors.white,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
})