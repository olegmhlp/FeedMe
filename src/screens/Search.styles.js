import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FCFAF8',
  },

  screenHeader: {
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 36,
    marginBottom: 15,
  },

  search: {
    borderRadius: 40,
    height: 48,
    width: "100%",
    backgroundColor: "#EEEEEE",
    fontSize: 16,
    paddingLeft: 16
  },

  searchContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FCFAF8',
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
    width: "45%",
    height: 210,
    // marginRight: 10,
    
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
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
    width: 100,
    height: 100,
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
