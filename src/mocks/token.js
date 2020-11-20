import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async (token, id) => {
  try {
    AsyncStorage.setItem('@auth_token', token);
    AsyncStorage.setItem('@userId', JSON.stringify(id));
  } catch (error) {
    return null;
  }
};

export const getToken = async () => {
  try {
    const value = AsyncStorage.getItem('@auth_token');
    return value;
  } catch (error) {
    return null;
  }
};

