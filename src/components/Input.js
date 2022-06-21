import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native'
import { THEME } from '../styles/theme.style';

export const Input = ({
  children,
  autoCapitalize = "none",
  placeholder = '',
  defaultValue = '',
  onSubmitEditing,
  editable = true,
  blurOnSubmit = false,
  secureTextEntry = false,
  returnKeyType,
  onChangeText,
  keyboardType = 'default',
  inputRef
}) => {

  return (
    <View style={styles.completeInput}>
      <View style={styles.icon}>
        {children}
      </View>
      <TextInput
        style={[styles.input, {color:!editable ? THEME.colors.blueGray : THEME.colors.gray }]}
        editable={editable}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        defaultValue={defaultValue}
        placeholderTextColor={THEME.colors.gray}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        ref={inputRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  completeInput: {
    flexDirection: 'row',
    marginBottom: 17,
    borderBottomWidth: 1,
    borderColor: THEME.colors.middleGray,
    backgroundColor: THEME.colors.bg
  },
  icon: {
    justifyContent: 'center',
    paddingLeft: 5
  },
  input: {
    backgroundColor: THEME.colors.bg,
    borderRadius: 5,
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '95%'
  },
})