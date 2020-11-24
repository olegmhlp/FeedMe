import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from '../app.json';
import {AppRegistry, LogBox} from 'react-native';
import RootNavigator from './navigators/RootNavigator';
import {createStore, combineReducers} from 'redux';
import cookbooksReducer from './store/reducers/cookbooks';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
  cookbooksStore: cookbooksReducer,
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export const registerApp = () => {
  // Ignore log notification by message:
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs(true);

  AppRegistry.registerComponent(appName, () => App);
};
