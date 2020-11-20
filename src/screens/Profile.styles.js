import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#FCFAF8',
  },

  screenHeader: {
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 36,
    marginBottom: 15,
  },

  search: {
    borderRadius: 10,
    height: 52,
    width: '100%',
    backgroundColor: '#EEEEEE',
    fontSize: 16,
    paddingLeft: 16,
    marginBottom: 20,
  },

  searchContainer: {
    marginBottom: 40,
  },

  appButtonContainer: {
    backgroundColor: '#F7B602',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  appButtonContainerOutlined: {
    borderColor: '#F7B602',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  appButtonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },

  logOutButton: {
    marginTop: 50,
    borderColor: '#F7B602',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
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
