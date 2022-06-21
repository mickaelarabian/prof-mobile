import React from 'react';
import { Routes } from '../constants/routes'
import { DashboardScreen } from '../screens/DashboardScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LessonsScreen } from '../screens/LessonsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux';
import { TabBar } from './TabBar';
import { LanguageScreen } from '../screens/LanguageScreen';
import { AddressScreen } from '../screens/AddressScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { ProfileInfosScreen } from '../screens/ProfileInfosScreen';
import { PaymentMethodsScreen } from '../screens/PaymentMethodsScreen';
import { PaymentHistory } from '../screens/PaymentHistory';
import { NewCardScreen } from '../screens/NewCardScreen';
import { TeacherScreen } from '../screens/TeacherScreen';

export const OnlineRouter = () => {
  const user = useSelector(s => s.user);
  const AppTab = createBottomTabNavigator()
  const AppStack = createStackNavigator()

  const DashboardNavigator = () => {
    return (
      <AppTab.Navigator
        initialRouteName={Routes.Dashboard}
        tabBar={props => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <AppTab.Screen name={Routes.Dashboard} component={DashboardScreen} />
        <AppTab.Screen name={Routes.Lessons} component={LessonsScreen} />
        <AppTab.Screen name={Routes.Explore} component={ExploreScreen} />
        <AppTab.Screen name={Routes.Profile} component={ProfileScreen} />
      </AppTab.Navigator>
    )
  }


  return (
    <>
      {user.hasAddress ?
        <AppStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={Routes.Home}
        >
          <AppStack.Screen name={Routes.Home} component={DashboardNavigator} />
          <AppStack.Screen name={Routes.Language} component={LanguageScreen} />
          <AppStack.Screen name={Routes.Lesson} component={LessonScreen} />
          <AppStack.Screen name={Routes.ProfileInfos} component={ProfileInfosScreen} />
          <AppStack.Screen name={Routes.PaymentMethods} component={PaymentMethodsScreen} />
          <AppStack.Screen name={Routes.PaymentHistory} component={PaymentHistory} />
          <AppStack.Screen name={Routes.NewCard} component={NewCardScreen} />
          <AppStack.Screen name={Routes.Teacher} component={TeacherScreen} />
        </AppStack.Navigator>
        :
        <AppStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={Routes.Address}
        >
          <AppStack.Screen name={Routes.Home} component={AddressScreen} />
        </AppStack.Navigator>
      }


    </>
  )
}
