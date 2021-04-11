import {
  CLEAR_SEARCH,
  CREATE_RECIPE,
  SET_RECIPES,
  SET_SEARCH,
  TOGGLE_SAVE,
} from '../actions/recipes';

const initialState = {
  recipes: [],
  trendingRecipes: [],
  foundRecipes: [],
  savedRecipes: [],
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
        trendingRecipes: action.recipes.filter((i) => i.trending),
      };
    case TOGGLE_SAVE:
      const existingIndex = state.savedRecipes.findIndex(
        (i) => i.id === +i.recipeId,
      );
      if (existingIndex >= 0) {
        const updatedSaveRecipes = [...state.savedRecipes];
        updatedSaveRecipes.splice(existingIndex, 1);
        return {...state, savedRecipes: updatedSaveRecipes};
      } else {
        const recipe = state.recipes.find((i) => i.id === +action.recipeId);
        return {
          ...state,
          savedRecipes: state.savedRecipes.concat(recipe),
        };
      }
    case SET_SEARCH: {
      const searchWord = action.search;
      const searchedRecipes = state.recipes.filter((recipe) => {
        if (recipe.title.toUpperCase().startsWith(searchWord)) {
          return recipe;
        }
      });
      return {...state, foundRecipes: searchedRecipes};
    }

    case CLEAR_SEARCH: {
      return {...state, foundRecipes: []};
    }
    case CREATE_RECIPE: {
      return {...state, recipes: state.recipes.concat(action.recipeData)};
    }
    default:
      return state;
  }
};

export default recipesReducer;
