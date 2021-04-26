import {GET_ALL_DATA} from '../actions/allData';

const initialState = {
  cookbooks: [],
  authors: [],
  recipes: [],
};

const allDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DATA:
      return {
        ...state,
        cookbooks: action.cookbooks,
        authors: action.authors,
        recipes: action.recipes,
      };
    default:
      return state;
  }
};

export default allDataReducer;
