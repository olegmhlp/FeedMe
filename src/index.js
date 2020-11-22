import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from '../app.json';
import {AppRegistry, LogBox} from 'react-native';
import RootNavigator from './navigators/RootNavigator';

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export const registerApp = () => {
  // Ignore log notification by message:
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs(true);

  AppRegistry.registerComponent(appName, () => App);
};
