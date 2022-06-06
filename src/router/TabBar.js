import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { CalendarIcon } from '../components/svgs/Calendar'
import { HomeIcon } from '../components/svgs/Home'
import { ProfileIcon } from '../components/svgs/Profile'
import { SearchIcon } from '../components/svgs/Search'
import { THEME } from '../styles/theme.style'

export const TabBar = ({ state, navigation }) => {

  const getIcon = (color, index) => {
    const icons = [
      <HomeIcon color={color} />,
      <CalendarIcon color={color} />,
      <SearchIcon color={color} />,
      <ProfileIcon color={color} />
    ]
    return icons[index]
  }

  const Tabs = () => state.routes.map((item, index) => {
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: item.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate({ name: item.name, merge: true });
      }

    }
    const color = isFocused ? THEME.colors.primary : THEME.colors.gray
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.tab}
      >
        {getIcon(color, index)}
        <Text style={[styles.title, { color: isFocused ? THEME.colors.primary : THEME.colors.gray }]}>{item.name}</Text>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.tabBar} >
      <Tabs />
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%'
  },
  title: {
    fontSize: 10,
    marginTop: 5
  }
})