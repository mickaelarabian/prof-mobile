import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { THEME } from '../styles/theme.style';
import { useTranslation } from 'react-i18next';
import { ChevronBottomIcon } from './svgs/ChevronBottom';

export const Select = ({
  children,
  handleSelect,
  isOpen,
  setIsOpen,
  value,
  defaultValue,
  options
}) => {
  const { t } = useTranslation();


  const displayOptions = () => options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={{ padding: 10, backgroundColor: THEME.colors.white }}
      activeOpacity={0.5}
      onPress={() => handleSelect(item.value)}
    >
      <Text style={styles.option}>{t(item.label)}</Text>
    </TouchableOpacity>
  ))

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setIsOpen(!isOpen)}
        style={styles.completeInput}
      >
        <View style={styles.icon}>
          {children}
        </View>
        <View style={styles.select}>
          <Text style={styles.selectTitle}>{value ? t(value) : t(defaultValue)}</Text>
          <ChevronBottomIcon color={THEME.colors.gray} size={20} />
        </View>
      </TouchableOpacity>
      {isOpen &&
        <ScrollView style={styles.options}>
          {displayOptions()}
        </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  completeInput: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: THEME.colors.middleGray,
    backgroundColor: THEME.colors.bg
  },
  select: {
    backgroundColor: THEME.colors.bg,
    borderRadius: 5,
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: THEME.colors.gray,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20
  },
  selectTitle: {
    color: THEME.colors.gray
  },
  icon: {
    justifyContent: 'center',
    paddingLeft: 5
  },
  options: {
    position: 'absolute',
    backgroundColor: THEME.colors.white,
    borderRadius: 5,
    width: '100%',
    maxHeight: 200,
    top: 37,
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
  option: {
    color: THEME.colors.gray
  },
})