import React, {useState, useEffect} from 'react';
import {styles} from './HomeScreen.styles';
import {CookbookCard, RecipeCard} from '../../components';
import {View, Text, ScrollView, ImageBackground, FlatList} from 'react-native';
import {trendingRecipes, recipesData, authors} from '../../mocks';
import {useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const [trendRecipesList, setTrendRecipesList] = useState([]);
  const [authorsList, setAuthorsList] = useState(authors);

  const popularCookbooks = useSelector(
    (state) => state.cookbooksStore.mostPopularCookbooks,
  );

  useEffect(() => {
    const getTrendRecipesData = recipesData.filter((item) =>
      trendingRecipes.find((i) => i === item.id),
    );

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
          data={popularCookbooks}
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
              source={require('../../assets/picked1.png')}
              style={{width: '100%', height: 200, justifyContent: 'flex-end'}}
              imageStyle={{borderRadius: 16}}>
              <Text style={styles.insideText}>Its all about pancakes</Text>
            </ImageBackground>
          </View>
          <View style={[styles.midPicked, {marginRight: 15}]}>
            <ImageBackground
              source={require('../../assets/picked2.png')}
              style={{width: '100%', height: 150, justifyContent: 'flex-end'}}
              imageStyle={{borderRadius: 16}}>
              <Text style={styles.insideSmallText}>Fast breakfast</Text>
            </ImageBackground>
          </View>
          <View style={styles.midPicked}>
            <ImageBackground
              source={require('../../assets/picked3.png')}
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

export default HomeScreen;
