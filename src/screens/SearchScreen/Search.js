import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SmallCookbookCard} from '../../components/CookbookCards';
import {SmallRecipeCard} from '../../components/RecipesCards';

import {styles} from './Search.styles';
import {CookbookDetails} from '../../components/CookbookDetails';
import {clearSearch, setSearch} from '../../store/actions/cookbooks';

const Search = ({navigation}) => {
  const cookbookData = useSelector((state) => state.cookbooksStore.cookbooks);
  const recipesData = useSelector((state) => state.recipesStore.recipes);
  const authorsData = useSelector((state) => state.authorsStore.authors);

  const [selectedSection, setSelectedSection] = useState(1);

  const openRecipe = (id) => navigation.navigate('RecipeDetails', {id: id});
  const openCookbook = (id, author) =>
    navigation.navigate('CookbookDetails', {id: id, author: author});

  return (
    <ScrollView
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      style={{marginBottom: 20, marginTop: 20, backgroundColor: '#FCFAF8'}}
      contentContainerStyle={{flexGrow: 1, paddingLeft: 20, paddingRight: 20}}>
      <Text style={styles.screenHeader}>Search</Text>
      <TextInput
        style={styles.search}
        placeholder="Cookbooks or Recipes"
        onFocus={() => navigation.navigate('FullScreenSearch')}
      />

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
            cookbooksList={cookbookData}
            openCookbook={openCookbook}
            authorsList={authorsData}
          />
        ) : (
          <RecipesList recipesList={recipesData} openRecipe={openRecipe} />
        )}
      </View>
    </ScrollView>
  );
};

const CookbooksList = ({cookbooksList, openCookbook, authorsList}) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}>
    {cookbooksList.map((item) => (
      <SmallCookbookCard
        key={item.id}
        openCookbook={openCookbook}
        id={item.id}
        source={item.source}
        title={item.title}
        author={authorsList.find((i) => i.id === item.author)}
        views={item.views}
      />
    ))}
  </View>
);

const RecipesList = ({recipesList, openRecipe}) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}>
    {recipesList.map((item) => (
      <SmallRecipeCard
        key={item.id}
        openRecipe={openRecipe}
        id={item.id}
        source={item.source}
        title={item.title}
        author={item.author}
        views={item.views}
      />
    ))}
  </View>
);

const FullScreenSearch = ({root, navigation}) => {
  const [value, setValue] = useState('');

  const searchData = useSelector(
    (state) => state.cookbooksStore.foundCookbooks,
  );

  const dispatch = useDispatch();

  const openCookbook = (id, author) =>
    navigation.navigate('CookbookDetails', {id: id, author: author});

  const searchingFunction = (inputValue) => {
    setValue(inputValue);
    const upperValue = inputValue.trim().toUpperCase();
    upperValue ? dispatch(setSearch(upperValue)) : dispatch(clearSearch());
  };

  const clearInput = () => {
    dispatch(clearSearch());
    setValue('');
  };

  const goBackAndClear = () => {
    clearInput();
    navigation.goBack();
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
        <TouchableOpacity onPress={goBackAndClear} style={{paddingLeft: 20}}>
          <Ionicons name="arrow-back" size={20} color="#393939" />
        </TouchableOpacity>
        <TextInput
          autoFocus
          style={styles.fullSearch}
          placeholder="Cookbooks or Recipes"
          onChangeText={searchingFunction}
          value={value}
        />
        <TouchableOpacity onPress={clearInput} style={{paddingRight: 20}}>
          <Ionicons name="close-outline" size={30} color="#393939" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {searchData &&
          searchData.length !== 0 &&
          searchData.map((item) => {
            return (
              <SmallCookbookCard
                openCookbook={openCookbook}
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
