import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../screens/HomeScreen/HomeScreen.styles';
import {authorStyles} from './AuthorDetails.styles';
import {SmallRecipeCard, SmallCookbookCard} from '../index';
import {buttonStyles} from '../Navigation.styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

export const AuthorDetails = ({route, navigation}) => {
  const {id} = route.params;
  const [authorDetails, setAuthorDetails] = useState({});
  const [recipesList, setRecipesList] = useState({});
  const [cookbooksList, setCookbooksList] = useState({});
  const [selectedSection, setSelectedSection] = useState(1);
  const cookbookData = useSelector((state) => state.cookbooksStore.cookbooks);
  const recipesData = useSelector((state) => state.recipesStore.recipes);
  const authorsData = useSelector((state) => state.authorsStore.authors);

  useEffect(() => {
    const getAuthor = authorsData.find((item) => item.id === id);
    getAuthor && setAuthorDetails(getAuthor);

    const getRecipesList = recipesData.filter((item) => item.author === id);
    getRecipesList.length && setRecipesList(getRecipesList);

    const getCookbookList = cookbookData.filter((item) => item.author === id);
    getCookbookList.length && setCookbooksList(getCookbookList);
  }, [cookbookData, id]);

  const openRecipe = (id) =>
    navigation.navigate('RecipeDetails', {id: id, author: authorDetails});
  const openCookbook = (id) => navigation.navigate('CookbookDetails', {id: id});
  const {name, email, description, avatar} = authorDetails;

  return (
    <ScrollView style={(styles.mainContainer, {padding: 20})}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={buttonStyles.buttonContainer}>
        <Ionicons name="arrow-back" size={20} color="#393939" />
        <Text style={buttonStyles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={authorStyles.container}>
        <Image
          source={{uri: avatar}}
          style={{width: 100, height: 100, borderRadius: 300}}
        />
        <View style={authorStyles.infoContainer}>
          <Text style={authorStyles.name}>{name}</Text>
          <Text style={authorStyles.email}>{email}</Text>
        </View>
      </View>
      <Text style={authorStyles.description}>{description}</Text>
      <View style={{marginBottom: 30}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.sectionHeader,
              {marginRight: 30, color: '#8A8A8A', fontSize: 24},
              selectedSection === 1 && styles.selectedText,
            ]}
            onPress={() => setSelectedSection(1)}>
            Cookbooks
          </Text>
          <Text
            style={[
              styles.sectionHeader,
              {color: '#8A8A8A', fontSize: 24},
              selectedSection === 2 && styles.selectedText,
            ]}
            onPress={() => setSelectedSection(2)}>
            Recipes
          </Text>
        </View>
        {selectedSection === 1 ? (
          <CookbooksList
            cookbooksList={cookbooksList}
            openCookbook={openCookbook}
            authorDetails={authorDetails}
          />
        ) : (
          <RecipesList
            recipesList={recipesList}
            openRecipe={openRecipe}
            authorDetails={authorDetails}
          />
        )}
      </View>
    </ScrollView>
  );
};

const CookbooksList = ({cookbooksList, openCookbook, authorDetails}) => (
  <FlatList
    data={cookbooksList}
    numColumns={2}
    renderItem={({item}) => (
      <SmallCookbookCard
        openCookbook={openCookbook}
        id={item.id}
        source={item.source}
        title={item.title}
        author={authorDetails}
        views={item.views}
      />
    )}
    keyExtractor={(item, index) => `${item.id}`}
  />
);

const RecipesList = ({recipesList, openRecipe, authorDetails}) => (
  <FlatList
    data={recipesList}
    numColumns={2}
    renderItem={({item}) => (
      <SmallRecipeCard
        openRecipe={openRecipe}
        id={item.id}
        source={item.source}
        title={item.title}
        author={authorDetails}
        views={item.views}
      />
    )}
    keyExtractor={(item, index) => `${item.id}`}
  />
);
