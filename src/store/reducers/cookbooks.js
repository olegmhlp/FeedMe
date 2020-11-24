import {cookbookData} from '../../mocks';
import {CLEAR_SEARCH, SET_SEARCH, TOGGLE_SAVE} from '../actions/cookbooks';

const initialState = {
  cookbooks: cookbookData,
  mostPopularCookbooks: cookbookData
    .sort((a, b) => b.views - a.views)
    .slice(0, 5),
  foundCookbooks: [],
  savedCookbooks: [],
};

const cookbooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SAVE:
      const existingIndex = state.savedCookbooks.findIndex(
        (cookbook) => cookbook.id === +action.cookbookId,
      );
      if (existingIndex >= 0) {
        const updatedSaveCookbooks = [...state.savedCookbooks];
        updatedSaveCookbooks.splice(existingIndex, 1);
        return {...state, savedCookbooks: updatedSaveCookbooks};
      } else {
        const cookbook = state.cookbooks.find(
          (cookbook) => cookbook.id === +action.cookbookId,
        );
        return {
          ...state,
          savedCookbooks: state.savedCookbooks.concat(cookbook),
        };
      }
    case SET_SEARCH: {
      const searchWord = action.search;
      const searchedCookbooks = state.cookbooks.filter((cookbook) => {
        if (cookbook.title.toUpperCase().startsWith(searchWord))
          return cookbook;
      });
      return {...state, foundCookbooks: searchedCookbooks};
    }

    case CLEAR_SEARCH: {
      return {...state, foundCookbooks: []};
    }
    default:
      return state;
  }
};

export default cookbooksReducer;
