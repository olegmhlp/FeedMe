import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator} from 'react-navigation';
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, Button, Image, Modal} from 'react-native';
import {styles} from './Profile.styles';
import {authors} from '../../mocks';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {SmallCookbookCard} from '../../components/CookbookCards';
import CreateCookbookForm from '../../components/CreateCookbookForm';
import { set } from 'react-native-reanimated';

const ProfileScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({});
  const [isShown, setIsShow] = useState(false);
  const savedBooks = useSelector(
    (state) => state.cookbooksStore.savedCookbooks,
  );

  useEffect(() => {
    const fetchId = async () => {
      const id = await AsyncStorage.getItem('@userId');
      if (id) {
        const findUser = authors.find((i) => i.id === +id);
        findUser && setUserDetails(findUser);
      }
    };

    fetchId();
  }, []);

  const createBook = () => {
    setIsShow(true);
  };

  const onCancel = () => {
    setIsShow(false)
  }

  const onSubmit = () => {}

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

      {!savedBooks || savedBooks.length === 0 ? (
        <Text>You have no saved cookbooks</Text>
      ) : (
        <FlatList
          data={savedBooks}
          style={{flexDirection: 'row', flexWrap: 'wrap'}}
          renderItem={({item}) => (
            <SmallCookbookCard
              openCookbook={null}
              id={item.id}
              title={item.title}
              author={item.author}
              views={item.views}
            />
          )}
        />
      )}
      <Modal visible={isShown} animationType="fade">
        <CreateCookbookForm onCancel={onCancel}/>
      </Modal>
      <View style={{marginTop: 20}}>
        <TouchableNativeFeedback
          onPress={createBook}
          style={styles.createButton}>
          <Text style={styles.appButtonText}>Create new cookbook</Text>
        </TouchableNativeFeedback>
      </View>
      <View style={{position: 'absolute', bottom: 30, left: 20, right: 20}}>
        <TouchableNativeFeedback onPress={logOut} style={styles.logOutButton}>
          <Text style={styles.appButtonText}>Log out</Text>
        </TouchableNativeFeedback>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
