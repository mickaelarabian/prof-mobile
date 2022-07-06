import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { THEME } from '../styles/theme.style';

export const LinearButton = ({
  activeOpacity = 0.5,
  onPress,
  title = 'Button',
  width = '100%',
  children,
  alignSelf = 'center',
  textTransform = 'none',
  disabled = false,
  primary = THEME.colors.primary,
  secondary = THEME.colors.secondary,
  color = THEME.colors.white,
  rounded = true,
  marginBottom = 10,
  fontSize = 14,
  flex = 0
}) => {

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={{ width, alignSelf, flex }}
      onPress={onPress}
    >
      <LinearGradient colors={[primary, secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.button, { borderRadius: rounded ? 25 : 0, marginBottom }]}>
        <Text style={[styles.title, { textTransform, color, fontSize }]}>{title}</Text>
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