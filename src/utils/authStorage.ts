import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';
const LOGIN_KEY = 'loggedIn';

export const saveUser = async (email: string, password: string) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify({ email, password }));
};

export const getUser = async (): Promise<{ email: string; password: string } | null> => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const setLoggedIn = async (value: boolean) => {
  await AsyncStorage.setItem(LOGIN_KEY, value ? 'true' : 'false');
};

export const getLoggedInUser = async () => {
  const loggedIn = await AsyncStorage.getItem(LOGIN_KEY);
  return loggedIn === 'true';
};

export const logout = async () => {
  await AsyncStorage.setItem(LOGIN_KEY, 'false');
};
