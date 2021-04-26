import {fetchAuthors} from './authors';
import {fetchCookbooks} from './cookbooks';
import {fetchRecipes} from './recipes';

export const GET_ALL_DATA = 'GET_ALL_DATA';

export const fetchAllData = () => {
  return async (dispatch) => {
    try {
      const response = await Promise.all([
        fetchCookbooks,
        fetchAuthors,
        fetchRecipes,
      ]);
      dispatch({
        type: GET_ALL_DATA,
        cookbooks: response[0],
        authors: response[1],
        recipes: response[2],
      });
    } catch (error) {
      throw error;
    }
  };
};
