import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  Modal,
  RefreshControl,
} from 'react-native';
import {styles} from './Profile.styles';
import {authors} from '../../mocks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList, TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {SmallCookbookCard} from '../../components/CookbookCards';
import CreateCookbookForm from '../../components/CreateCookbookForm';
import {logout} from '../../store/actions/auth';

const ProfileScreen = ({navigation}) => {
  const [isShown, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const savedBooks = useSelector(
    (state) => state.cookbooksStore.savedCookbooks,
  );
  const userDetails = useSelector((state) => state.auth);

  const update = () => {
    setIsLoading(true);
    setIsLoading(false);
  };

  const createBook = () => {
    setIsShow(true);
  };

  const onCancel = () => {
    setIsShow(false);
  };

  const dispatch = useDispatch();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={update} refreshing={isLoading} />
      }
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
            {userDetails.userName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
            }}>
            {userDetails.userEmail}
          </Text>
        </View>
      </View>

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
        <CreateCookbookForm onCancel={onCancel} />
      </Modal>
      <View style={{marginTop: 20}}>
        <TouchableNativeFeedback
          onPress={createBook}
          style={styles.createButton}>
          <Text style={styles.appButtonText}>Create new cookbook</Text>
        </TouchableNativeFeedback>
      </View>
      <View style={{position: 'absolute', bottom: 30, left: 20, right: 20}}>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(logout);
            navigation.navigate('LoginScreen');
          }}
          style={styles.logOutButton}>
          <Text style={styles.appButtonText}>Log out</Text>
        </TouchableNativeFeedback>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
