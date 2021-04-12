import Author from '../../models/author';

export const GET_AUTHORS = 'GET_AUTHORS';

export const fetchAuthors = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-learn-d3ad2.firebaseio.com/authors.json',
      );

      if (!response.ok) {
        throw new Error('Fetch issue');
      }

      const resData = await response.json();
      let setAuthors = [];

      for (const key in resData) {
        setAuthors.push(
          new Author(key, resData[key].name, resData[key].description),
        );
      }

      dispatch({type: GET_AUTHORS, authors: setAuthors});
    } catch (error) {
      throw error;
    }
  };
};
