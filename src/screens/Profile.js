import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from './Profile.styles';

const Profile = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Text style={styles.screenHeader}>Profile</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;
