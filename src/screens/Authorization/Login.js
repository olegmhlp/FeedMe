import React, {useState, useEffect} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {TextInput, TouchableNativeFeedback} from 'react-native-gesture-handler';
import {login} from '../../store/actions/auth';
import {useDispatch} from 'react-redux';

import {styles} from '../ProfileScreen/ProfileScreen.styles';

const LoginScreen = ({navigation}) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    if (!credentials.email || !credentials.password) {
      return;
    }

    setError(null);
    try {
      setIsLoading(true);
      await dispatch(login(credentials.email, credentials.password));
      setIsLoading(false);
      navigation.navigate('ProfileScreen');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          flexGrow: 1,
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: 'center',
        },
      ]}>
      <Text style={[styles.screenHeader, {marginBottom: 40}]}>Login</Text>

      <TextInput
        style={styles.search}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={inputChangeHandler.bind(this, 'email')}
        placeholder="Email"
        value={credentials.email}
      />
      <TextInput
        style={styles.search}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={inputChangeHandler.bind(this, 'password')}
        value={credentials.password}
        placeholder="Password"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#F7B602" />
      ) : (
        <TouchableNativeFeedback
          onPress={authHandler}
          style={[styles.appButtonContainer]}>
          <Text style={styles.appButtonText}>Login</Text>
        </TouchableNativeFeedback>
      )}

      <Text
        style={{
          textAlign: 'center',
          paddingTop: 13,
          fontSize: 16,
          paddingBottom: 13,
          color: 'gray',
        }}>
        or
      </Text>

      <TouchableNativeFeedback
        onPress={() => navigation.navigate('CreateAccount')}
        style={styles.appButtonContainerOutlined}>
        <Text style={styles.appButtonText}>Create new account</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export default LoginScreen;
