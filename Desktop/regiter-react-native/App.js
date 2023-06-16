import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './app/MainNavigator';
import LoginProvider from './app/context/LoginProvider';
import ImageUpload from './app/components/ImageUpload';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}
