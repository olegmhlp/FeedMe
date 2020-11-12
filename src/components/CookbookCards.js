import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity, Image, Text} from 'react-native';
import {styles} from '../screens/HomeScreen.styles';

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
      <Text style={styles.author}>{author.name}</Text>
    </TouchableOpacity>
  );
};
