import {AUTHENTICATE, LOGOUT} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  userEmail: null,
  userName: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        userEmail: action.userEmail,
        userName: action.userName,
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};


export default appReducer