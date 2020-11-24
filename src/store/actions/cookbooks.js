import {ToolbarAndroid} from 'react-native';

export const TOGGLE_SAVE = ' TOOGLE_SAVE';
export const SET_SEARCH = 'SET_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const toggleSave = (id) => {
  return {
    type: TOGGLE_SAVE,
    cookbookId: id,
  };
};

export const setSearch = (value) => {
  return {type: SET_SEARCH, search: value};
};

export const clearSearch = () => {
  return {type: CLEAR_SEARCH};
};
