import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Text, ScrollView} from 'react-native';
import {styles} from '../screens/HomeScreen/HomeScreen.styles';

import {cookbookData, recipesData} from '../mocks';
import {SmallRecipeCard} from './RecipesCards';

export const CookbookDetails = ({route, navigation}) => {
  const {id, author} = route.params;
  const [cookData, setCookData] = useState({});
  const [recipesList, setRecipesList] = useState([]);
  useEffect(() => {
    const getCookbook = cookbookData.find((item) => item.id === id);
    const getRecipesList = recipesData.filter((item) =>
      getCookbook.recipes.find((i) => i === item.id),
    );
    getRecipesList.length && setRecipesList(getRecipesList);
    getCookbook && setCookData(getCookbook);
  }, []);

  const openRecipe = (id) =>
    navigation.push('RecipeDetails', {id: id, author: author});
  const openAuthor = (id) => navigation.push('AuthorDetails', {id: id});

  const {title, views, description} = cookData;
  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{paddingLeft: 20, paddingRight: 20, flexGrow: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Ionicons name="arrow-back" size={24} color="#393939" />
        <Text
          style={{
            fontSize: 24,
            marginLeft: 10,
            marginBottom: 3,
            color: '#393939',
          }}>
          Back
        </Text>
      </TouchableOpacity>

      <Text style={{fontSize: 40, fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity
        onPress={() => openAuthor(author.id)}
        style={{marginBottom: 15, marginTop: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={require('../assets/avatar.png')}
            style={{width: 30, height: 30, marginRight: 8}}
          />
          <Text
            style={{
              fontSize: 21,
              color: '#F7B602',
              fontWeight: '600',
            }}>
            {author.name}
          </Text>
        </View>
      </TouchableOpacity>
      <FastImage
        source={require('../assets/picked1.png')}
        style={{width: '100%', height: 300, borderRadius: 8}}
      />
      <View>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            marginTop: 20,
            marginBottom: 5,
          }}>
          Description
        </Text>
        <Text style={{fontSize: 16, lineHeight: 24, color: '#575757'}}>
          {description}
        </Text>
      </View>
      <View style={[styles.viewsContainer, {marginTop: 15, marginBottom: 30}]}>
        <FastImage
          style={{
            marginRight: 10,
            width: 22,
            height: 16,
          }}
          source={require('../assets/show.png')}
        />
        <Text style={{fontSize: 16}}>{views} views</Text>
      </View>

      <TouchableOpacity onPress={null} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Add to my Cookbooks</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionHeader, {marginTop: 30}]}>Recipes</Text>
      <View style={styles.recipesList}>
        {recipesList.map((item) => {
          return (
            <SmallRecipeCard
            key={item.id}
              openRecipe={openRecipe}
              id={item.id}
              source={item.source}
              title={item.title}
              author={item.author}
              views={item.views}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
