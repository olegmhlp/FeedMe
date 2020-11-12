import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {TouchableOpacity, Image, Text} from 'react-native';
import {styles} from '../screens/HomeScreen.styles';
import {authors} from '../mocks/authors.json';
import {recipesData} from '../mocks/recepies.json';
import {cookbookData} from '../mocks/cookbooks.json';
import {SmallRecipeCard} from './RecipesCards';
import {SmallCookbookCard} from './CookbookCards';

export const AuthorDetails = ({route, navigation}) => {
  const {id} = route.params;
  const [authorDetails, setAuthorDetails] = useState({});
  const [recipesList, setRecipesList] = useState({});
  const [cookbooksList, setCookbooksList] = useState({});

  useEffect(() => {
    const getAuthor = authors.find((item) => item.id === id);
    getAuthor && setAuthorDetails(getAuthor);

    const getRecipesList = recipesData.filter((item) => item.author === id);
    getRecipesList.length && setRecipesList(getRecipesList);

    const getCookbookList = cookbookData.filter((item) => item.author === id);
    getCookbookList.length && setCookbooksList(getCookbookList);
  }, []);

  const openRecipe = (id) => navigation.navigate('RecipeDetails', {id: id});
  const openCookbook = (id) => navigation.navigate('CookbookDetails', {id: id});
  const {name, email, description} = authorDetails;

  return (
    <ScrollView style={(styles.mainContainer, {padding: 20})}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../public/avatar.png')}
          style={{width: 100, height: 100}}
        />
        <View
          style={{
            display: 'flex',
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

      <View style={styles.recipesList}>
        <Text style={styles.sectionHeader}>Cookbooks</Text>
        <FlatList
          data={cookbooksList}
          renderItem={({item}) => (
            <SmallCookbookCard
              openCookbook={openCookbook}
              id={item.id}
              source={item.source}
              title={item.title}
              author={item.author}
              views={item.views}
            />
          )}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>

      <View style={styles.recipesList}>
        <Text style={styles.sectionHeader}>Recipes</Text>
        <FlatList
          data={recipesList}
          renderItem={({item}) => (
            <SmallRecipeCard
              openRecipe={openRecipe}
              id={item.id}
              source={item.source}
              title={item.title}
              author={item.author}
              views={item.views}
            />
          )}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>
    </ScrollView>
  );
};
