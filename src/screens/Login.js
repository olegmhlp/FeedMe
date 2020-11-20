import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {login} from '../mocks/api';

import {setToken} from '../mocks/token';
import {styles} from './Profile.styles';

const LoginScreen = ({navigation}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  const loginUser = () => {
    const {email, password} = credentials;
    email &&
      password &&
      login(email, password)
        .then(async (res) => {
          await setToken(res.auth_token, res.id);
          setCredentials({
            email: null,
            password: null,
          });
          navigation.navigate('ProfileScreen');
        })
        .catch((err) => setErrorMessage(err.message));
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
        value={credentials.email}
        onChangeText={(input) => setCredentials({...credentials, email: input})}
        placeholder="Email"
      />
      <TextInput
        style={[styles.search, {marginTop: 10}]}
        value={credentials.password}
        onChangeText={(input) =>
          setCredentials({...credentials, password: input})
        }
        placeholder="Password"
      />
      <TouchableNativeFeedback
        onPress={loginUser}
        style={[styles.appButtonContainer]}>
        <Text style={styles.appButtonText}>Log in</Text>
      </TouchableNativeFeedback>

      <Text
        style={{
          textAlign: 'center',
          paddingTop: 13,
          paddingBottom: 13,
          color: 'gray',
        }}>
        or
      </Text>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate('CreateAccount')}
        style={styles.appButtonContainerOutlined}>
        <Text style={styles.appButtonText}>Create account</Text>
      </TouchableNativeFeedback>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default LoginScreen;
