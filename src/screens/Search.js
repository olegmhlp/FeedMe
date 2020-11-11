import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, FlatList, TextInput} from 'react-native';
import {cookbookData} from '../mocks/cookbooks.json';
import {styles} from './Search.styles';

const Search = () => {
  return (
    <>
      <View style={styles.searchContainer}>
        <Text style={styles.screenHeader}>Search</Text>
        <TextInput style={styles.search} placeholder="Cookbooks or Recipes" />
      </View>
      <CookbookList />
    </>
  );
};


const CookbookSmallCard = ({source, title, author, views}) => {
  return (
    <View style={styles.cookbookCard}>
      <View style={styles.viewsContainer}>
        <Image
          style={{marginRight: 6, width: 16, height: 12, resizeMode: 'contain'}}
          source={require('../../public/show.png')}
        />
        <Text>{views} views</Text>
      </View>
      <Image
        source={require('../../public/cookbook1.png')}
        style={styles.cookbookImage}
      />
      <Text style={styles.cookbookTitle}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );
};

const CookbookList = () => {
  const [cookbookList, setCookbookList] = useState([]);
  useEffect(() => {
    setCookbookList(cookbookData || []);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text>Cookbooks</Text>
      <FlatList
        data={cookbookList}
        // style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', backgroundColor: 'red' }}
        
        renderItem={({item}) => (
          <CookbookSmallCard
            source={item.source}
            title={item.title}
            author={item.author}
            views={item.views}
          />
        )}
        keyExtractor={(item, index) => `${item.id}`}
      />
    </View>
  );
};
const RecipesList = () => <View></View>;

const SearchStack = createStackNavigator();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      {/* <SearchStack.Screen
        name="Cookbooks"
        component={CookbookList}
      />
       <SearchStack.Screen
        name="Recipes"
        component={RecipesList}
      /> */}
    </SearchStack.Navigator>
  );
}

export default SearchStackNavigator;
