import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import {styles} from '../../screens/HomeScreen/HomeScreen.styles';
import {buttonStyles} from '../Navigation.styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

export const RecipeDetails = ({route, navigation}) => {
  const {id, author} = route.params;
  const [recipesList, setRecipesList] = useState({});

  const recipesData = useSelector((state) => state.recipesStore.recipes);
  useEffect(() => {
    const getRecipe = recipesData.find((item) => item.id === id);
    getRecipe && setRecipesList(getRecipe);
  }, [id]);

  const {
    title,
    views,
    description,
    directions,
    ingredients,
    source,
  } = recipesList;

  const openAuthor = (id) => navigation.navigate('AuthorDetails', {id: id});

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        flexGrow: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={buttonStyles.buttonContainer}>
        <Ionicons name="arrow-back" size={20} color="#393939" />
        <Text style={buttonStyles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity
        onPress={() => openAuthor(author.id)}
        style={{marginBottom: 15, marginTop: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: author.avatar}}
            style={{width: 30, height: 30, marginRight: 8, borderRadius: 300}}
          />
          <Text
            style={{
              fontSize: 18,
              color: '#F7B602',
              fontWeight: '600',
            }}>
            {author?.name}
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        source={{uri: source}}
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
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            paddingBottom: 16,
            color: '#575757',
          }}>
          {description}
        </Text>
      </View>
      <View style={styles.cookbookViews}>
        <Image
          style={styles.viewsIcon}
          source={require('../../assets/show.png')}
        />
        <Text style={styles.viewsText}>{views} views</Text>
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
                key={index}
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
                key={index}
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
