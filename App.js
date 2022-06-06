import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import store from './src/redux/storeConfig';
import { AppRouter } from './src/router';
import { THEME } from './src/styles/theme.style';
import './i18n';

const App = () => {

  const theme = {
    dark: false,
    colors: {
      background: THEME.colors.bg
    },
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />

        <AppRouter theme={theme} />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
