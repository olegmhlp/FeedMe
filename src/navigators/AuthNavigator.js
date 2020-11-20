import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileNavigator from './ProfileNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    const fetchToken = async () => {
      const auth = await AsyncStorage.getItem('@auth_token');
      auth && setHasToken(true);
    };

    fetchToken();
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      {hasToken ? (
        <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
      ) : (
        <Stack.Screen name="AuthScreenWrapper" component={AuthScreenWrapper} />
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
