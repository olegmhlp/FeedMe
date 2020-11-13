import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SmallCookbookCard} from '../components/CookbookCards';
import {SmallRecipeCard} from '../components/RecipesCards';

import {recipesData} from '../mocks/recepies.json';
import {cookbookData} from '../mocks/cookbooks.json';

import {authors} from '../mocks/authors.json';
import {styles} from './Search.styles';
import { CookbookDetails } from '../components/CookbookDetails';

const Search = ({navigation}) => {
  const [recipesList, setRecipesList] = useState(recipesData);
  const [cookbooksList, setCookbooksList] = useState(cookbookData);
  const [authorsList, setAuthorsList] = useState(authors);
  const [selectedSection, setSelectedSection] = useState(1);

  const openRecipe = (id) => navigation.navigate('RecipeDetails', {id: id});
  const openCookbook = (id, author) => navigation.navigate('CookbookDetails', {id: id, author: author});

  return (
    <ScrollView
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      style={{padding: 20, backgroundColor: '#FCFAF8'}}>
      <Text style={styles.screenHeader}>Search</Text>
      <TextInput
        style={styles.search}
        placeholder="Cookbooks or Recipes"
        onFocus={() => navigation.navigate('FullScreenSearch')}
      />

      <View style={{marginBottom: 30}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
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
            authorsList={authorsList}
          />
        ) : (
          <RecipesList recipesList={recipesList} openRecipe={openRecipe} />
        )}
      </View>
    </ScrollView>
  );
};

const CookbooksList = ({cookbooksList, openCookbook, authorsList}) => (
  <FlatList
    data={cookbooksList}
    numColumns={2}
    renderItem={({item}) => (
      <SmallCookbookCard
        openCookbook={openCookbook}
        id={item.id}
        source={item.source}
        title={item.title}
        author={authorsList.find((i) => i.id === item.author)}
        views={item.views}
      />
    )}
    keyExtractor={(item, index) => `${item.id}`}
  />
);

const RecipesList = ({recipesList, openRecipe}) => (
  <FlatList
    data={recipesList}
    numColumns={2}
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
);

const FullScreenSearch = ({root, navigation}) => {
  const [value, setValue] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState(cookbookData);


  const openCookbook = (id, author) => navigation.navigate('CookbookDetails', {id: id, author: author});
  
  const searchingFunction = (inputValue) => {
    const upperValue = inputValue?.toUpperCase();
    const filterData = masterDataSource.filter((i) => {
      if (i.title.toUpperCase().startsWith(upperValue)) return i;
    });

    filterData.length && setFilteredDataSource(filterData);
    setValue(inputValue);
  };

  const clearInput = () => {
    setFilteredDataSource([]);
    setValue('');
  };

  return (
    <ScrollView
      style={{backgroundColor: '#FCFAF8'}}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderBottomColor: '#F0F0F0',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingLeft: 20}}>
          <Ionicons name="arrow-back" size={20} color="#393939" />
        </TouchableOpacity>
        <TextInput
          autoFocus
          style={styles.fullSearch}
          placeholder="Cookbooks or Recipes"
          onFocus={() => navigation.navigate('FullScreenSearch')}
          onChangeText={(text) => searchingFunction(text)}
          value={value}
        />
        <TouchableOpacity
          onPress={() => clearInput()}
          style={{paddingRight: 20}}>
          <Ionicons name="close-outline" size={30} color="#393939" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{padding: 20}}
        numColumns={2}
        data={filteredDataSource}
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
      />
    </ScrollView>
  );
};

const SearchStack = createStackNavigator();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <SearchStack.Screen
        name="FullScreenSearch"
        component={FullScreenSearch}
        options={{headerShown: false}}
      />
        <SearchStack.Screen
        name="CookbookDetails"
        component={CookbookDetails}
        options={{headerShown: false}}
      />
    </SearchStack.Navigator>
  );
}

export default SearchStackNavigator;
