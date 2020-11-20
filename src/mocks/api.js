import AsyncStorage from "@react-native-community/async-storage";

const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 1000);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 1000);
  });
};

const users = [
  {
    name: 'Sanya Test',
    email: 'test1',
    password: 'test',
    description: 'I don’t know about you but I love pizza.',
    id: 5,
  },
  {
    name: 'Den Kek',
    email: 'test2',
    password: 'test',
    description: 'I don’t know about you but I love pizza.',
    id: 4,
  },
];

export const login = (email, password) => {
  const findUser = users.find(
    (i) => i.email === email && i.password === password,
  );

  if (findUser) {
    const userID = findUser.id;
    return mockSuccess({auth_token: 'successful_fake_token', id: userID});
  } else return mockFailure({error: 500, message: 'Wrong email or password!'});
};

export const createAccount = (email, password, shouldSucceed = true) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({error: 500, message: 'Wrong email or password!'});
  }

  return mockSuccess({auth_token: 'successful_fake_token'});
};

export const saveCookbook = async (cookBookId, userId) => {
  try {
    AsyncStorage.multiSet([["cookBookId", cookBookId ], ["userId", userId]])
  } catch (error) {
    
  }

}