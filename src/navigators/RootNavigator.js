import React, {memo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchStackNavigator from '../screens/SearchScreen/Search';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthNavigator from './AuthNavigator';
import HomeScreenNavigator from './HomeScreenNavigator';

const Tab = createBottomTabNavigator();

export default memo(() => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color}) => {
        let iconName;
        if (route.name === 'Home') {
          focused ? (iconName = 'home') : (iconName = 'home-outline');
        } else if (route.name === 'Search') {
          focused ? (iconName = 'search') : (iconName = 'search-outline');
        } else {
          focused ? (iconName = 'person') : (iconName = 'person-outline');
        }

        return (
          <Ionicons
            name={iconName}
            size={20}
            color={color}
            style={{paddingTop: 8}}
          />
        );
      },
    })}
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: '#FDB900',
      labelStyle: {fontSize: 15, paddingBottom: 4, fontWeight: '600'},
      inactiveTintColor: 'gray',
      style: {height: 50, position: 'absolute'},
    }}>
    <Tab.Screen name="Home" component={HomeScreenNavigator} />
    <Tab.Screen name="Search" component={SearchStackNavigator} />
    <Tab.Screen name="Profile" component={AuthNavigator} />
  </Tab.Navigator>
));
