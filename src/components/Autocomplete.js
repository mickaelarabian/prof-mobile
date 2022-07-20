import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { THEME } from '../styles/theme.style';
import { useTranslation } from 'react-i18next';
import { PositionIcon } from './svgs/Position';

export const Autocomplete = ({
  defaultValue,
  setValue,
  handleSelectValue,
  suggestions,
  children
}) => {
  const { t } = useTranslation();

  const displaySuggestions = () => suggestions.map((item, idx) => (
    <TouchableOpacity
      key={idx}
      activeOpacity={0.5}
      onPress={() => handleSelectValue(item)}
    >
      <Text style={styles.suggestion}>{item.name}</Text>
    </TouchableOpacity>
  ))

  return (
    <View>
      <View style={styles.completeInput}>
        <View style={styles.icon}>
         {children}
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="sentences"
          placeholder={t('address.title')}
          defaultValue={defaultValue}
          placeholderTextColor="#666666"
          onChangeText={(text) => setValue(text)}
        />
      </View>
      {suggestions.length > 0 &&
        <ScrollView style={styles.suggestions}>
          {displaySuggestions()}
        </ScrollView>
      }
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
    color: THEME.colors.gray,
    width: '95%'
  },
  suggestions: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    top: 37,
    maxHeight: 200,
    zIndex: 99,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
  suggestion: {
    color: THEME.colors.gray,
    padding: 5
  },
})