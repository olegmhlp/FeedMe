import React, {useState, useEffect} from 'react';
import {styles} from './HomeScreen.styles';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import {cookbookData} from '../mocks/cookbooks.json';
import {trendingRecipes, recipesData} from '../mocks/recepies.json';

const CookbookCard = ({source, title, author, views}) => {
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

const RecipeCard = ({source, title, author, views}) => {
  return (
    <View style={styles.recipeCard}>
      <View style={styles.viewsContainer}>
        <Image
          style={{marginRight: 6, width: 16, height: 12, resizeMode: 'contain'}}
          source={require('../../public/show.png')}
        />
        <Text>{views} views</Text>
      </View>
      <Image
        source={require('../../public/recipe1.png')}
        style={styles.recipeImage}
      />
      <Text style={styles.cookbookTitle}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );
};

const HomeScreen = () => {

  const [cookbooksList, setCookbooksList] = useState([]);
  const [trendRecipesList, setTrendRecipesList] = useState([]);

  useEffect(() => {
    const mostPopularCookBooks = cookbookData
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const getTrendRecipesData = recipesData.filter((item) =>
      trendingRecipes.find((i) => i === item.id),
    );
    setCookbooksList(mostPopularCookBooks);
    setTrendRecipesList(getTrendRecipesData);
  }, []);
  
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <View style={{padding: 20, marginBottom: 5}}>
        <Text style={styles.sectionHeader}>Most Popular Cookbooks</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={cookbooksList}
          renderItem={({item}) => (
            <CookbookCard
              source={item.source}
              title={item.title}
              author={item.author}
              views={item.views}
            />
          )}
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
      <View style={{backgroundColor: '#F7B602', padding: 20, marginBottom: 20}}>
        <Text style={styles.sectionHeader}>Trending recipes</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={trendRecipesList}
          renderItem={({item}) => (
            <RecipeCard
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

export default HomeScreen;
