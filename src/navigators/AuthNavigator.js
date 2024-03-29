import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import {useDispatch} from 'react-redux';
import {ActivityIndicator, View} from 'react-native';

import * as authActions from '../store/actions/auth';
import LoginScreen from '../screens/Authorization/Login';
import CreateAccount from '../screens/Authorization/CreateAccount';
const Stack = createStackNavigator();

const AuthNavigator = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const auth = await AsyncStorage.getItem('userData');
      if (!auth) {
        navigation.navigate('LoginScreen');
        return;
      }
      const transformedAuth = JSON.parse(auth);
      const {
        token,
        userId,
        userEmail,
        userName,
        expirationDate,
      } = transformedAuth;
      const expireDate = new Date(expirationDate);
      if (expireDate <= new Date() || !token || !userId) {
        navigation.navigate('LoginScreen');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      dispatch(authActions.authenticate(token, userId, userEmail, userName));
      navigation.navigate('ProfileScreen');
    };
    fetchToken();
  }, [dispatch, navigation]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#F7B602" />
      </View>
    );
  }

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
