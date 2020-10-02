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

    console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};


export const clearData = async () => {
      try {
         await AsyncStorage.getAllKeys()
            .then((keys) => AsyncStorage.multiRemove(keys))
            .then(() => {
                alert('Logged out');
            return true;
        });
      } catch (e) {
       //error cleaning
      }

};