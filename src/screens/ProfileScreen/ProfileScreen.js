import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  RefreshControl,
} from 'react-native';
import {styles} from './ProfileScreen.styles';
import {FlatList, TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {SmallCookbookCard, CreateCookbookForm} from '../../components';
import {logout} from '../../store/actions/auth';

const ProfileScreen = ({navigation}) => {
  const [isShown, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useSelector((state) => state.auth);
  const savedCookbooks = useSelector(
    (state) => state.cookbooksStore.savedCookbooks,
  );

  const openCookbook = (cookbookId, author) =>
    navigation.navigate('CookbookDetails', {id: cookbookId, author: author});

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
      <View style={styles.profileAvatar}>
        <Image
          source={require('../../assets/avatar.png')}
          style={{width: 100, height: 100}}
        />
        <View style={styles.profileContainer}>
          <Text style={styles.usernameText}>{userDetails.userName}</Text>
          <Text style={styles.email}>{userDetails.userEmail}</Text>
        </View>
      </View>
      <View style={{marginTop: 20, marginBottom: 26}}>
        <TouchableNativeFeedback
          onPress={createBook}
          style={styles.createButton}>
          <Text style={styles.appButtonText}>Create new cookbook</Text>
        </TouchableNativeFeedback>
      </View>

      {!savedCookbooks || !savedCookbooks.length ? (
        <Text>You have no saved cookbooks</Text>
      ) : (
        <FlatList
          data={savedCookbooks}
          horizontal
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
      <View style={styles.buttonContainer}>
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
