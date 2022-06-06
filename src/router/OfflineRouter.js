import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../constants/routes'
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { LanguageScreen } from '../screens/LanguageScreen';

export const OfflineRouter = () => {

  const AuthStack = createStackNavigator()

  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      animationEnabled={false}
    >
      <AuthStack.Screen
        headerMode='none'
        name={Routes.Auth}
        component={AuthScreen}
      />
       <AuthStack.Screen
        headerMode='none'
        name={Routes.Login}
        component={LoginScreen}
      />
       <AuthStack.Screen
        headerMode='none'
        name={Routes.Register}
        component={RegisterScreen}
      />
       <AuthStack.Screen
        headerMode='none'
        name={Routes.Language}
        component={LanguageScreen}
      />
    </AuthStack.Navigator>
  )
}
