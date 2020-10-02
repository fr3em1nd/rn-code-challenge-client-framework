import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {Auth0Provider} from '@auth0/auth0-react';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Auth0Provider
        domain="https://dev-9757j7km.us.auth0.com/api/v2/"
        clientId="5f76ff89e84034003fac8316"
        redirectUri={window.location.origin}
      >
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Auth0Provider>
    );
  }
}
