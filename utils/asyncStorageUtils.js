import AsyncStorage from '@react-native-async-storage/async-storage';

const appendDataToKey = async (key, value) => {
  /*
     {
        "key": [value1, value2, value3]
     }
    */

  try {
    // get all keys
    const keys = await AsyncStorage.getAllKeys();
    // if there is no key, create an empty array
    if (!keys.includes(key)) {
      const newValue = [value];
      // set the key with the new value
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } else {
      const values = await AsyncStorage.getItem(key);
      const parsedValues = JSON.parse(values);
      parsedValues.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(parsedValues));
    }
  } catch (e) {
    // saving error
    console.log(e);
  }
};

const setFieldToKey = async (key, field, value) => {
  try {
    // get all keys
    const keys = await AsyncStorage.getAllKeys();
    // if there is no key, create an empty object
    if (!keys.includes(key)) {
      newObj = { [field]: value };
      await AsyncStorage.setItem(key, JSON.stringify(newObj));
    } else {
      const curObj = await AsyncStorage.getItem(key);
      const parsedObj = JSON.parse(curObj);
      parsedObj[field] = value;

      await AsyncStorage.setItem(key, JSON.stringify(parsedObj));
    }
  } catch (e) {
    console.log(e);
  }
};

const getValueFromKey = async (key, field, value) => {
  try {
    let values = await AsyncStorage.getItem(key);
    values = JSON.parse(values);
    const res = values.find((j) => j[field] === value);
    return res;
  } catch (e) {
    // error reading value
    console.error(e);
    throw new Error(e);
  }
};

const getAllValuesFromKey = async (key) => {
  try {
    let values = await AsyncStorage.getItem(key);
    values = JSON.parse(values);
    return values;
  } catch (e) {
    // error reading value
    throw new Error(e);
  }
};

const delValueFromKey = async (key, field, value) => {
  try {
    let values = await AsyncStorage.getItem(key);
    values = JSON.parse(values);
    const res = values.filter((j) => j[field] !== value);
    await AsyncStorage.setItem(key, JSON.stringify(res));
  } catch (e) {
    // error reading value
    console.error(e);
    throw new Error(e);
  }
};

export { appendDataToKey, setFieldToKey, getValueFromKey, getAllValuesFromKey, delValueFromKey };
