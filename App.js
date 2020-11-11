import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {cookbookData} from './src/mocks/cookbooks.json';
import {trendingRecipes, recipesData} from './src/mocks/recepies.json';
// import Home from './screens/Home';
// import Search from './screens/Search';
// import Profile from './screens/Profile';

const CookbookCard = ({source, title, author, views}) => {
  return (
    <View style={styles.cookbookCard}>
      <View style={styles.viewsContainer}>
        <Image
          style={{marginRight: 6, width: 16, height: 12, resizeMode: 'contain'}}
          source={require('./public/show.png')}
        />
        <Text>{views} views</Text>
      </View>
      <Image
        source={require('./public/cookbook1.png')}
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
          source={require('./public/show.png')}
        />
        <Text>{views} views</Text>
      </View>
      <Image
        source={require('./public/recipe1.png')}
        style={styles.recipeImage}
      />
      <Text style={styles.cookbookTitle}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );
};

function Home() {
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
              source={require('./public/picked1.png')}
              style={{width: '100%', height: 200, justifyContent: 'flex-end'}}
              imageStyle={{borderRadius: 16}}>
              <Text style={styles.insideText}>Its all about pancakes</Text>
            </ImageBackground>
          </View>
          <View style={[styles.midPicked, {marginRight: 15}]}>
            <ImageBackground
              source={require('./public/picked2.png')}
              style={{width: '100%', height: 150, justifyContent: 'flex-end'}}
              imageStyle={{borderRadius: 16}}>
              <Text style={styles.insideSmallText}>Fast breakfast</Text>
            </ImageBackground>
          </View>
          <View style={styles.midPicked}>
            <ImageBackground
              source={require('./public/picked3.png')}
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
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    backgroundColor: '#FCFAF8',
  },

  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 36,
    marginBottom: 15,
  },

  recipeCard: {
    width: 300,
    height: 360,
    marginRight: 25,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 4,
    borderColor: '#F0F0F0',
    borderWidth: 1,
  },

  recipeImage: {
    width: '100%',
    height: 245,
    borderRadius: 16,
  },

  cookbookCard: {
    width: 250,
    height: 310,
    marginRight: 25,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
    borderColor: '#F0F0F0',
    borderWidth: 1,
  },

  viewsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  cookbookImage: {
    width: 210,
    height: 200,
    borderRadius: 16,
  },

  cookbookTitle: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: '700',
  },

  author: {
    fontSize: 12,
    color: '#474747',
  },

  pickedByUsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginBottom: 45,
  },

  largePicked: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 16,
  },

  midPicked: {
    flex: 2,
    height: 150,
    backgroundColor: 'green',
    borderRadius: 16,
  },

  insideText: {
    fontSize: 21,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    margin: 15,
    borderRadius: 4,
    backgroundColor: 'white',
  },

  insideSmallText: {
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    margin: 15,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

function Search() {
  return (
    <View>
      <Text>Search Screen</Text>
    </View>
  );
}

function Profile() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              focused ? (iconName = 'home') : (iconName = 'home-outline');
            } else if (route.name === 'Search') {
              focused ? (iconName = 'search') : (iconName = 'search-outline');
            } else {
              focused ? (iconName = 'person') : (iconName = 'person-outline');
            }

            return (
              <Ionicons
                name={iconName}
                size={20}
                color={color}
                style={{paddingTop: 8}}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#FDB900',
          labelStyle: {fontSize: 15, paddingBottom: 4, fontWeight: '600'},
          inactiveTintColor: 'gray',
          style: {height: 50},
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
