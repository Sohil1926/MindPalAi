import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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
    throw new Error(e);
  }
};

const addFieldToArrayOfObjects = async (
  key,
  targetKey,
  targetVal,
  field,
  value
) => {
  try {
    // const keys = await AsyncStorage.getAllKeys();
    const values = await getAllValuesFromKey(key);
    const index = values.findIndex((j) => j[targetKey] === targetVal);
    values[index][field] = value;
    await AsyncStorage.setItem(key, JSON.stringify(values));
  } catch (e) {
    // console.log(e);
    // throw new Error(e);
    Alert.alert('Error', 'Something unexpected happened. Please try again.');
  }
};

const setFieldToKey = async (key, field, value) => {
  /*
      key: {field: value}
  */
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
    throw new Error(e);
  }
};

const getObjFromKey = async (key) => {
  /*
      key: {field: value}
      returns {field: value}
  */
  try {
    let values = await AsyncStorage.getItem(key);
    if (values === null) {
      return null;
    }
    values = JSON.parse(values);
    return values;
  } catch (e) {
    // error reading value
    console.error(e);
    throw new Error(e);
  }
};

const getValueUsingFieldVal = async (key, field, value) => {
  /* 
    key: [{field: value}, {field: not_this_value}]
    returns {field: value}
  */
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
  /* 
    key: {field: value, field2: value2}
    returns {field: value, field2: value2}
  */
  try {
    let values = await AsyncStorage.getItem(key);
    values = JSON.parse(values);
    return values;
  } catch (e) {
    // error reading value
    throw new Error(e);
  }
};

const deleteValueFromArr = async (key, field, value) => {
  /* 
    key: [{field: value}, {field: not_this_value}]
    delete {field: value}
  */
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

const clearObjFromKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify({}));
  } catch (e) {
    // error reading value
    console.error(e);
    throw new Error(e);
  }
};

const deleteFieldFromObj = async (key, field) => {
  /* 
    storage[key] = object with field field
  */
  try {
    const obj = await getObjFromKey(key);
    delete obj[field];
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const setKeyToJson = async (key, jsonData) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(jsonData));
  } catch (e) {
    // error reading value
    console.error(e);
    throw new Error(e);
  }
};

const setKeyToVal = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // error reading value
    console.error(e);
    Alert.alert('Error', 'Something unexpected happened. Please try again.');
    // throw new Error(e);
  }
};

const getVal = async (key) => {
  try {
    let values = await AsyncStorage.getItem(key);
    if (values === null) {
      return null;
    }
    return values;
  } catch (e) {
    // error reading value
    console.error(e);
    Alert.alert('Error', 'Something unexpected happened. Please try again.');
  }
};

const getJsonFromKey = async (key) => {
  try {
    let values = await AsyncStorage.getItem(key);
    if (values === null) {
      return null;
    }
    values = JSON.parse(values);
    return values;
  } catch (e) {
    // error reading value
    console.error(e);
    throw new Error(e);
  }
};

const deleteKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    console.error(e);
    throw new Error(e);
  }
};

export {
  appendDataToKey,
  setFieldToKey,
  getValueUsingFieldVal,
  getAllValuesFromKey,
  deleteValueFromArr,
  getObjFromKey,
  clearObjFromKey,
  deleteFieldFromObj,
  setKeyToJson,
  setKeyToVal,
  getVal,
  deleteKey,
  addFieldToArrayOfObjects,
};
