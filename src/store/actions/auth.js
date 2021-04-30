import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (
  token,
  userId,
  userEmail,
  userName,
  expiryTime,
) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
      userEmail: userEmail,
      userName: userName,
    });
  };
};

export const signup = (displayName, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXesSkdwBuODmC_C0pdUI-Bm-YACFoPtY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = errorId;
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        resData.email,
        resData.displayName,
        +resData.expiresIn * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000,
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.email,
      resData.displayName,
      expirationDate,
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXesSkdwBuODmC_C0pdUI-Bm-YACFoPtY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Invalid email or password';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        resData.email,
        resData.displayName,
        +resData.expiresIn * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000,
    );

    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.email,
      resData.displayName,
      expirationDate,
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout);
    }, expirationTime);
  };
};

const saveDataToStorage = (
  token,
  userId,
  userEmail,
  userName,
  expirationDate,
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      userEmail,
      userName,
      expirationDate: expirationDate.toISOString(),
    }),
  );
};
