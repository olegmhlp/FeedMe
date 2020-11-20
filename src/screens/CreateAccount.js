import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import {
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {createAccount, login} from '../mocks/api';
import {setToken} from '../mocks/token';

// import {styles} from './Profile.styles';

const CreateAccount = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    repPassword: null,
  });
  const loginUser = () => {
    const {email, password, repPassword} = credentials;
    email &&
      password &&
      password === repPassword &&
      login(email, password)
        .then(async (res) => {
          await setToken(res.auth_token);
          setCredentials({
            email: null,
            password: null,
            repPassword: null,
          });
          navigation.navigate('ProfileScreen');
        })
        .catch((err) => setErrorMessage(err.message));
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CreateAccount;
