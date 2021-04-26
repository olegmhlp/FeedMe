import {StyleSheet} from 'react-native';

export const authorStyles = StyleSheet.create({
  entriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },

  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 20,
  },

  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    lineHeight: 21,
    color: '#787878',
    marginBottom: 32,
  },
  email: {
    fontSize: 16,
    color: '#000',
  },
});
