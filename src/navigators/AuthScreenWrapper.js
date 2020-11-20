import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAccount from '../screens/CreateAccount';
import LoginScreen from '../screens/Login';

const Stack = createStackNavigator();

const AuthScreenWrapper = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default AuthScreenWrapper;
