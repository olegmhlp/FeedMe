import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator} from 'react-navigation';
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, Button, Image} from 'react-native';
import {styles} from './Profile.styles';
import {authors, cookbookData} from '../../mocks';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, TouchableNativeFeedback} from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({});

  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const fetchId = async () => {
      const id = await AsyncStorage.getItem('@userId');
      if (id) {
        const findUser = authors.find((i) => i.id === +id);
        findUser && setUserDetails(findUser);
      }
    };

    if ([].length) {
      const getBooks = cookbookData.filter((book) =>
        [].find((i) => i === book.id),
      );
      getBooks.length && setSavedBooks([...savedBooks, ...getBooks]);
    }

    fetchId();
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem('@userId');
    await AsyncStorage.removeItem('@auth_token');
    navigation.navigate('AuthScreenWrapper');
  };

  const {name, email, description} = userDetails;

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{paddingLeft: 20, paddingRight: 20, flexGrow: 1}}>
      <View style={styles.searchContainer}>
        <Text style={styles.screenHeader}>My profile</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../assets/avatar.png')}
          style={{width: 100, height: 100}}
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#000',
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
            }}>
            {email}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          lineHeight: 21,
          color: '#787878',
        }}>
        {description}
      </Text>

      {savedBooks.length === 0 ? (
        <Text>You have no saved cookbooks</Text>
      ) : (
        <FlatList
          data={savedBooks}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />
      )}
      <TouchableNativeFeedback
        onPress={() => logOut()}
        style={styles.logOutButton}>
        <Text style={styles.appButtonText}>Log out</Text>
      </TouchableNativeFeedback>
    </ScrollView>
  );
};

export default ProfileScreen;
