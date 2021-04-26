import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {styles} from '../../screens/HomeScreen/HomeScreen.styles';
import {buttonStyles} from '../Navigation.styles';

import {SmallRecipeCard} from '../index';
import {useSelector, useDispatch} from 'react-redux';
import {toggleSave} from '../../store/actions/cookbooks';

export const CookbookDetails = ({route, navigation}) => {
  const {id, author} = route.params;
  console.log(author);
  const [cookData, setCookData] = useState({});
  const [recipesList, setRecipesList] = useState([]);
  const cookbookData = useSelector((state) => state.cookbooksStore.cookbooks);
  const recipesData = useSelector((state) => state.recipesStore.recipes);
  const authorsList = useSelector((state) => state.authorsStore.authors);
  const isCookbookSaved = useSelector((state) =>
    state.cookbooksStore.savedCookbooks.some((book) => book.id === id),
  );

  const dispatch = useDispatch();

  const toggleSaveHandler = () => {
    dispatch(toggleSave(id));
  };
  useEffect(() => {
    const getCookbook = cookbookData.find((item) => item.id === id);
    const getRecipesList = recipesData.filter((item) =>
      getCookbook?.recipes.find((i) => i === item.id),
    );
    getRecipesList.length && setRecipesList(getRecipesList);
    getCookbook && setCookData(getCookbook);
  }, [cookbookData, id, recipesData]);

  const openRecipe = (id) =>
    navigation.navigate('RecipeDetails', {id: id, author: author});
  const openAuthor = (authorId) =>
    navigation.navigate('AuthorDetails', {id: authorId});

  const {title, views, description} = cookData;
  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        flexGrow: 1,
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
          <FastImage
            source={require('../../assets/avatar.png')}
            style={{width: 30, height: 30, marginRight: 8}}
          />
          <Text
            style={{
              fontSize: 18,
              color: '#F7B602',
              fontWeight: '600',
            }}>
            {author.name}
          </Text>
        </View>
      </TouchableOpacity>
      <FastImage
        source={require('../../assets/picked1.png')}
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
            color: '#575757',
            marginBottom: 16,
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

      <TouchableOpacity
        onPress={toggleSaveHandler}
        style={
          isCookbookSaved
            ? styles.appOutlinedButtonContainer
            : styles.appButtonContainer
        }>
        <Text style={styles.appButtonText}>
          {isCookbookSaved ? 'Remove from saved' : 'Add to my cookbooks'}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.sectionHeader, {marginTop: 40}]}>Recipes</Text>
      <View style={styles.recipesList}>
        {recipesList.map((item) => {
          return (
            <SmallRecipeCard
              key={item.id}
              openRecipe={openRecipe}
              id={item.id}
              source={item.source}
              title={item.title}
              author={authorsList.find((i) => i.id === item.author)}
              views={item.views}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
