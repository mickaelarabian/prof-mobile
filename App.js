import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootSiblingParent } from 'react-native-root-siblings';
import store from './src/redux/storeConfig';
import { AppRouter } from './src/router';
import { THEME } from './src/styles/theme.style';
import './i18n';
import { initStripe } from '@stripe/stripe-react-native';
import { env } from './app.config';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

  const theme = {
    dark: false,
    colors: {
      background: THEME.colors.bg
    },
  };

  useEffect(() => {
    initStripe({
      publishableKey: env.KEYS.publicStripeKey,
      merchantIdentifier: 'merchant.identifier',
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />

          <AppRouter theme={theme} />
        </RootSiblingParent>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
