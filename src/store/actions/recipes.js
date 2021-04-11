import Recipe from '../../models/recipe';

export const TOGGLE_SAVE = ' TOOGLE_SAVE';
export const SET_SEARCH = 'SET_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';

export const fetchRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-learn-d3ad2.firebaseio.com/recipes.json',
      );

      if (!response.ok) {
        throw new Error('Fetch issue');
      }

      const resData = await response.json();
      let setRecipes = [];

      for (const key in resData) {
        setRecipes.push(
          new Recipe(
            key,
            resData[key].title,
            resData[key].author,
            resData[key].views,
            resData[key].trending,
            resData[key].directions,
            resData[key].ingredients,
            resData[key].description,
          ),
        );
      }

      dispatch({type: SET_RECIPES, recipes: setRecipes});
    } catch (error) {
      throw error;
    }
  };
};

export const toggleSave = (id) => {
  return {
    type: TOGGLE_SAVE,
    recipeId: id,
  };
};

export const setSearch = (value) => {
  return {type: SET_SEARCH, search: value};
};

export const clearSearch = () => {
  return {type: CLEAR_SEARCH};
};

export const createRecipe = ({title, directions, ingredients, description}) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log(token);
    console.log(userId);
    const response = await fetch(
      `https://rn-learn-d3ad2.firebaseio.com/recipes.json?auth=${token}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId,
          title,
          directions,
          ingredients,
          description,
        }),
      },
    );

    const resData = await response.json();
    dispatch({
      type: CREATE_RECIPE,
      recipeData: {
        id: resData.name,
        title,
        directions,
        ingredients,
        description,
      },
    });
  };
};
