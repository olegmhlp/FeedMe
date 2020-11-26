import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { AuthorDetails, CookbookDetails, RecipeDetails } from '../components';
import HomeScreen from '../screens/HomeScreen/HomeScreen';


const HomeNav = createStackNavigator();

const HomeScreenNavigator = () => (
  <HomeNav.Navigator>
    <HomeNav.Screen    
      options={{headerShown: false}}
      name="MainPage"
      component={HomeScreen}
    />
    <HomeNav.Screen
      name="CookbookDetails"
      component={CookbookDetails}
      options={{headerShown: false}}
    />
    <HomeNav.Screen
      name="RecipeDetails"
      component={RecipeDetails}
      options={{headerShown: false}}
    />
    <HomeNav.Screen
      name="AuthorDetails"
      component={AuthorDetails}
      options={{headerShown: false}}
    />
  </HomeNav.Navigator>
);


export default HomeScreenNavigator;
