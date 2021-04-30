import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity, Image, Text} from 'react-native';
import {styles} from '../../screens/HomeScreen/HomeScreen.styles';

export const RecipeCard = ({openRecipe, id, source, title, author, views}) => {
  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => openRecipe(id, author)}>
      <View style={styles.viewsContainer}>
        <Image
          style={styles.viewsIcon}
          source={require('../../assets/show.png')}
        />
        <Text style={styles.viewsText}>{views} views</Text>
      </View>
      <Image source={{uri: source}} style={styles.recipeImage} />
      <Text style={styles.cookbookTitle}>{title}</Text>
      <Text style={styles.author}>{author.name}</Text>
    </TouchableOpacity>
  );
};

export const SmallRecipeCard = ({
  openRecipe,
  id,
  source,
  title,
  author,
  views,
}) => {
  return (
    <TouchableOpacity
      style={styles.smallRecipeCard}
      onPress={() => openRecipe(id, author)}>
      <View style={styles.viewsContainer}>
        <Image
          style={styles.viewsIcon}
          source={require('../../assets/show.png')}
        />
        <Text style={styles.viewsText}>{views} views</Text>
      </View>
      <Image source={{uri: source}} style={styles.smallRecipeImage} />
      <Text style={styles.cookbookTitle}>{title}</Text>
      {author.name && <Text style={styles.author}>{author.name}</Text>}
    </TouchableOpacity>
  );
};
