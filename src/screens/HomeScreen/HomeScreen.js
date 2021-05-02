import React, {useState, useEffect, useCallback} from 'react';
import {styles} from './HomeScreen.styles';
import {CookbookCard, RecipeCard} from '../../components';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCookbooks} from '../../store/actions/cookbooks';
import {fetchRecipes} from '../../store/actions/recipes';
import {fetchAuthors} from '../../store/actions/authors';

const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const popularCookbooks = useSelector(
    (state) => state.cookbooksStore.mostPopularCookbooks,
  );

  const trendingRecipes = useSelector(
    (state) => state.recipesStore.trendingRecipes,
  );

  const authorsList = useSelector((state) => state.authorsStore.authors);

  const dispatch = useDispatch();

  const loadCookbooks = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(fetchCookbooks());
      dispatch(fetchRecipes());
      dispatch(fetchAuthors());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadCookbooks();
  }, [dispatch, loadCookbooks, setIsLoading]);

  const openCookbook = (id, author) =>
    navigation.navigate('CookbookDetails', {id: id, author: author});
  const openRecipe = (id, author) =>
    navigation.navigate('RecipeDetails', {id: id, author: author});

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An error occurred</Text>
        <Button title="Try again" onPress={loadCookbooks} />
      </View>
    );
  }

  if (authorsList.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#F7B602" />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={loadCookbooks} refreshing={isLoading} />
      }
      style={styles.mainContainer}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: 20, paddingLeft: 20, paddingBottom: 32}}>
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

      <View style={{padding: 20, paddingBottom: 32}}>
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
      <View
        style={{
          backgroundColor: '#F7B602',
          paddingLeft: 20,
          paddingBottom: 88,
          paddingTop: 56,
        }}>
        <Text style={styles.sectionHeader}>Trending recipes</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={trendingRecipes || []}
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
