import React, { useEffect } from 'react';
import { Routes } from '../constants/routes'
import { DashboardScreen } from '../screens/DashboardScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LessonsScreen } from '../screens/LessonsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux';
import { TabBar } from './TabBar';
import { LanguageScreen } from '../screens/LanguageScreen';
import { AddressScreen } from '../screens/AddressScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { ProfileInfosScreen } from '../screens/ProfileInfosScreen';
import { PaymentMethodsScreen } from '../screens/PaymentMethodsScreen';
import { PaymentHistoryScreen } from '../screens/PaymentHistoryScreen';
import { NewCardScreen } from '../screens/NewCardScreen';
import { TeacherScreen } from '../screens/TeacherScreen';
import { ColabScreen } from '../screens/ColabScreen';
import { ChatScreen } from '../screens/ChatScreen'
import { RoomScreen } from '../screens/RoomScreen';
import { horizontalAnimation } from '../constants/global';
import { sendNotificationsToken } from '../queries/UserQuery';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useNavigation } from '@react-navigation/native';
import { setNewNotification } from '../redux/chat';
import { UpdateAddressScreen } from '../screens/UpdateAddressScreen';

export const OnlineRouter = () => {
  const user = useSelector(s => s.user);
  const AppTab = createBottomTabNavigator()
  const AppStack = createStackNavigator()
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {
        console.log("TOKEN:", token);
        const res = await sendNotificationsToken(token.token)
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification here
        if (notification.data) {
          if (notification.data.code === 'tchat.new_message' && notification.data.room) {
            if (!notification.foreground) {
              navigation.navigate(Routes.Room, { id: notification.data.room })
            } else {
              dispatch(setNewNotification())
            }
          }
        }

        // required on iOS only

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: "835228624620",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  }, [])
console.log('port',user)
  const DashboardNavigator = () => {
    return (
      <AppTab.Navigator
        initialRouteName={Routes.Dashboard}
        tabBar={props => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <AppTab.Screen name={Routes.Dashboard} component={DashboardScreen} />
        <AppTab.Screen name={Routes.Lessons} component={LessonsScreen} />
        {user?.user?.role?.slug === 'student' &&
          <AppTab.Screen name={Routes.Explore} component={ExploreScreen} />
        }
        <AppTab.Screen name={Routes.Chat} component={ChatScreen} />
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
          <AppStack.Screen name={Routes.Home} component={DashboardNavigator} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.Language} component={LanguageScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.Lesson} component={LessonScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.Colab} component={ColabScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.ProfileInfos} component={ProfileInfosScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.PaymentMethods} component={PaymentMethodsScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.PaymentHistory} component={PaymentHistoryScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.NewCard} component={NewCardScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.Teacher} component={TeacherScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.Room} component={RoomScreen} options={horizontalAnimation} />
          <AppStack.Screen name={Routes.NewAddress} component={UpdateAddressScreen} options={horizontalAnimation} />
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
