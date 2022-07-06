import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../constants/routes'
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { LanguageScreen } from '../screens/LanguageScreen';
import { ForgotScreen } from '../screens/ForgotScreen';
import { horizontalAnimation } from '../constants/global';

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
        options={horizontalAnimation}
      />
      <AuthStack.Screen
        headerMode='none'
        name={Routes.Register}
        component={RegisterScreen}
        options={horizontalAnimation}
      />
      <AuthStack.Screen
        headerMode='none'
        name={Routes.Language}
        component={LanguageScreen}
        options={horizontalAnimation}
      />
      <AuthStack.Screen
        headerMode='none'
        name={Routes.Forgot}
        component={ForgotScreen}
        options={horizontalAnimation}
      />
    </AuthStack.Navigator>
  )
}
