import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity, Text, Image} from 'react-native';
import {styles} from '../../screens/HomeScreen/HomeScreen.styles';
import FastImage from 'react-native-fast-image';

export const CookbookCard = ({
  openCookbook,
  id,
  source,
  title,
  author,
  views,
}) => {
  return (
    <TouchableOpacity
      style={styles.cookbookCard}
      onPress={() => openCookbook(id, author)}>
      <View style={styles.viewsContainer}>
        <Image
          style={styles.viewsIcon}
          source={require('../../assets/show.png')}
        />
        <Text style={styles.viewsText}>{views} views</Text>
      </View>
      <FastImage
        source={require('../../assets/cookbook1.png')}
        style={styles.cookbookImage}
      />
      <Text style={styles.cookbookTitle}>{title}</Text>
      <Text style={styles.author}>{author.name}</Text>
    </TouchableOpacity>
  );
};

export const SmallCookbookCard = ({
  openCookbook,
  id,
  source,
  title,
  author,
  views,
}) => {
  return (
    <TouchableOpacity
      style={styles.smallCookbookCard}
      onPress={() => openCookbook(id, author)}>
      <View style={styles.viewsContainer}>
        <Image
          style={styles.viewsIcon}
          source={require('../../assets/show.png')}
        />
        <Text style={styles.viewsText}>{views} views</Text>
      </View>
      <FastImage
        source={require('../../assets/picked1.png')}
        style={styles.smallRecipeImage}
      />
      <Text style={styles.cookbookTitle}>{title}</Text>
      {author?.name && <Text style={styles.author}>{author.name}</Text>}
    </TouchableOpacity>
  );
};
