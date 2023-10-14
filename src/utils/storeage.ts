import AsyncStorage from '@react-native-async-storage/async-storage';

const _storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const _retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error);
  }
};

const _clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export { _storeData, _retrieveData, _clearData };
