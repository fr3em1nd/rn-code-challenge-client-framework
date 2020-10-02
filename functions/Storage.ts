import AsyncStorage from '@react-native-community/async-storage';

export const storeLoginData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@auth0_login', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getLoginData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@auth0_login');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
