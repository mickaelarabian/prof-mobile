import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { CalendarIcon } from '../components/svgs/Calendar'
import { ChatIcon } from '../components/svgs/Chat'
import { LessonIcon } from '../components/svgs/Home'
import { ProfileIcon } from '../components/svgs/Profile'
import { SearchIcon } from '../components/svgs/Search'
import { THEME } from '../styles/theme.style'
import { useSelector, useDispatch } from 'react-redux';
import { resetNotificationsAction } from '../redux/chat'
import { useTranslation } from 'react-i18next';

export const TabBar = ({ state, navigation }) => {
  const { notifications } = useSelector(s => s.chat);
  const { user } = useSelector(s => s.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getIcon = (color, index) => {
    if(user?.role?.slug === 'student'){
      const icons = [
        <CalendarIcon color={color} />,
        <LessonIcon color={color} />,
        <SearchIcon color={color} />,
        <ChatIcon color={color} />,
        <ProfileIcon color={color} />
      ]
      return icons[index]
    } else {
      const icons = [
        <CalendarIcon color={color} />,
        <LessonIcon color={color} />,
        <ChatIcon color={color} />,
        <ProfileIcon color={color} />
      ]
      return icons[index]
    }
  }

  const Tabs = () => state.routes.map((item, index) => {
    const isFocused = state.index === index;

    const onPress = (index) => {
      if(index === 3){
        dispatch(resetNotificationsAction())
      }
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
        onPress={() => onPress(index)}
        style={styles.tab}
      >
        {getIcon(color, index)}
        <Text style={[styles.title, { color: isFocused ? THEME.colors.primary : THEME.colors.gray }]}>{t(`tab.${item.name}`)}</Text>
        {index === 3 && notifications > 0 &&
          <View style={styles.badge}>
            <Text style={styles.number}>{notifications}</Text>
          </View>
        }
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
  },
  badge: {
    width:12,
    height:12,
    backgroundColor: 'red',
    position:'absolute',
    top:'15%',
    right:'30%',
    borderRadius:25
  },
  number: {
    color: THEME.colors.white,
    fontSize:8,
    alignSelf:'center'
  }
})