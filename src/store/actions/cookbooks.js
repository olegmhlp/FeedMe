import Cookbook from '../../models/cookbook.js';

export const TOGGLE_SAVE_COOKBOOK = ' TOGGLE_SAVE_COOKBOOK';
export const SET_SEARCH = 'SET_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const CREATE_COOKBOOK = 'CREATE_COOKBOOK';
export const SET_COOKBOOKS = 'SET_COOKBOOKS';

export const fetchCookbooks = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-learn-d3ad2.firebaseio.com/cookbooks.json',
      );

      if (!response.ok) {
        throw new Error('Fetch issue');
      }

      const resData = await response.json();
      let setCookbooks = [];

      for (const key in resData) {
        setCookbooks.push(
          new Cookbook(
            key,
            resData[key].title,
            resData[key].author,
            resData[key].views,
            resData[key].recipes,
            resData[key].description,
          ),
        );
      }

      dispatch({type: SET_COOKBOOKS, cookbooks: setCookbooks});
    } catch (error) {
      throw error;
    }
  };
};

export const toggleSave = (id) => {
  return {
    type: TOGGLE_SAVE_COOKBOOK,
    cookbookId: id,
  };
};

export const setSearch = (value) => {
  return {type: SET_SEARCH, search: value};
};

export const clearSearch = () => {
  return {type: CLEAR_SEARCH};
};

export const createCookbook = ({title, description, recipes}) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-learn-d3ad2.firebaseio.com/cookbooks.json?auth=${token}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId,
          title,
          description,
          recipes,
        }),
      },
    );

    const resData = await response.json();
    dispatch({
      type: CREATE_COOKBOOK,
      cookbookData: {
        id: resData.name,
        title,
        description,
        recipes,
      },
    });
  };
};
