import {GET_AUTHORS} from '../actions/authors';

const initialState = {
  authors: [],
};

const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTHORS:
      return {
        ...state,
        authors: action.authors,
      };
    default:
      return state;
  }
};

export default authorsReducer;
