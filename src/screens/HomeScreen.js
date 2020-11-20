import React, {useState, useEffect} from 'react';
import {styles} from './HomeScreen.styles';
import {
  CookbookCard,
  RecipeCard,
  RecipeDetails,
  CookbookDetails,
  AuthorDetails,
} from '../components';
import {View, Text, ScrollView, ImageBackground, FlatList} from 'react-native';
import {cookbookData} from '../mocks/cookbooks.json';
import {trendingRecipes, recipesData} from '../mocks/recepies.json';
import {authors} from '../mocks/authors.json';
import {createStackNavigator} from '@react-navigation/stack';

const Home = ({navigation}) => {
  const [cookbooksList, setCookbooksList] = useState([]);
  const [trendRecipesList, setTrendRecipesList] = useState([]);
  const [authorsList, setAuthorsList] = useState(authors);

  useEffect(() => {
    const mostPopularCookBooks = cookbookData
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const getTrendRecipesData = recipesData.filter((item) =>
      trendingRecipes.find((i) => i === item.id),
    );
    setCookbooksList(mostPopularCookBooks);
    setTrendRecipesList(getTrendRecipesData);
    setAuthorsList(authorsList);
  }, []);

  const openCookbook = (id, author) =>
    navigation.navigate('CookbookDetails', {id: id, author: author});
  const openRecipe = (id, author) =>
    navigation.navigate('RecipeDetails', {id: id, author: author});

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={{padding: 20, marginBottom: 5}}>
        <Text style={styles.sectionHeader}>Most Popular Cookbooks</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={cookbooksList}
          renderItem={({item}) => {
            const findAuthor = authorsList.find((i) => i.id === item.author);
            return (
              <CookbookCard
                openCookbook={openCookbook}
                id={item.id}
                source={item.source}
                title={item.title}
                author={findAuthor}
                views={item.views}
              />
            );
          }}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>

      <View style={{padding: 20, marginBottom: 5}}>
        <Text style={styles.sectionHeader}>Picked By Us</Text>
        <View style={styles.pickedByUsContainer}>
          <View style={styles.largePicked}>
            <ImageBackground
              source={require('../../public/picked1.png')}
              style={{width: '100%', height: 200, justifyContent: 'flex-end'}}
              imageStyle={{borderRadius: 16}}>
              <Text style={styles.insideText}>Its all about pancakes</Text>
            </ImageBackground>
          </View>
          <View style={[styles.midPicked, {marginRight: 15}]}>
            <ImageBackground
              source={require('../../public/picked2.png')}
              style={{width: '100%', height: 150, justifyContent: 'flex-end'}}
              imageStyle={{borderRadius: 16}}>
              <Text style={styles.insideSmallText}>Fast breakfast</Text>
            </ImageBackground>
          </View>
          <View style={styles.midPicked}>
            <ImageBackground
              source={require('../../public/picked3.png')}
              style={{width: '100%', height: 150, justifyContent: 'flex-end'}}
              imageStyle={{borderRadius: 16}}>
              <Text style={styles.insideSmallText}>Fruits and vegetables</Text>
            </ImageBackground>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: '#F7B602', padding: 20}}>
        <Text style={styles.sectionHeader}>Trending recipes</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={trendRecipesList}
          renderItem={({item}) => (
            <RecipeCard
              openRecipe={openRecipe}
              id={item.id}
              source={item.source}
              title={item.title}
              author={authorsList.find((i) => i.id === item.author)}
              views={item.views}
            />
          )}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>
    </ScrollView>
  );
};

const HomeNav = createStackNavigator();

const HomeScreen = () => (
  <HomeNav.Navigator>
    <HomeNav.Screen
      options={{headerShown: false}}
      name="MainPage"
      component={Home}
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

export default HomeScreen;
