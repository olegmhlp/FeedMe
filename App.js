import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SearchStackNavigator from './src/screens/Search';
import Profile from './src/screens/Profile';

const Tab = createBottomTabNavigator();

function App() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Tab.Navigator   
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
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
          keyboardHidesTabBar: false,
          activeTintColor: '#FDB900',
          labelStyle: {fontSize: 15, paddingBottom: 4, fontWeight: '600'},
          inactiveTintColor: 'gray',
          style: {height: 50, position: "absolute"},
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchStackNavigator} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
