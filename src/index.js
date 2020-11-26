import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from '../app.json';
import {AppRegistry, LogBox} from 'react-native';
import RootNavigator from './navigators/RootNavigator';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import cookbooksReducer from './store/reducers/cookbooks';
import appReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
  cookbooksStore: cookbooksReducer,
  auth: appReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs(true);

  AppRegistry.registerComponent(appName, () => App);
};
