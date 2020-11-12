import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import {styles} from '../screens/HomeScreen.styles';

import {recipesData} from '../mocks/recepies.json';

export const RecipeDetails = ({route, navigation}) => {
  const {id, author} = route.params;
  const [recipesList, setRecipesList] = useState({});

  useEffect(() => {
    const getRecipe = recipesData.find((item) => item.id === id);
    getRecipe && setRecipesList(getRecipe);
  }, []);

  const {
    title,
    views,
    description,
    directions,
    ingredients,
  } = recipesList;

  const openAuthor = (id) => navigation.navigate('AuthorDetails', {id: id})

  return (
    <ScrollView style={(styles.mainContainer, {padding: 20})}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity onPress={() => openAuthor(author.id)} style={{ marginBottom: 15, marginTop: 15}}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../public/avatar.png')}
            style={{width: 33, height: 33, marginRight: 5}}
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
      <Image
        source={require('../../public/recipe1.png')}
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
        <Image
          style={{
            marginRight: 10,
            width: 22,
            height: 16,
            resizeMode: 'contain',
          }}
          source={require('../../public/show.png')}
        />
        <Text style={{fontSize: 16}}>{views} views</Text>
      </View>

      <View>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            marginTop: 20,
            marginBottom: 15,
          }}>
          Directions
        </Text>
        <View>
          {directions &&
            directions.length !== 0 &&
            directions.map((i, index) => (
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#575757',
                  paddingBottom: 8,
                }}>
                <Text style={{fontWeight: 'bold'}}>Step {index + 1}</Text>: {i}
              </Text>
            ))}
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            marginTop: 40,
            marginBottom: 15,
          }}>
          Ingredients
        </Text>
        <View>
          {ingredients &&
            ingredients.length !== 0 &&
            ingredients.map((i, index) => (
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#575757',
                  paddingBottom: 8,
                }}>
                <Text
                  style={{
                    color: '#F7B602',
                    fontWeight: 'bold',
                  }}>{`\u2022`}</Text>
                {'  ' + i}
              </Text>
            ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => null}
        style={[styles.appButtonContainer, {marginBottom: 40, marginTop: 40}]}>
        <Text style={styles.appButtonText}>Add to my recipes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
