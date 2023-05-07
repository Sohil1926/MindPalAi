import { Alert } from 'react-native';
import * as AsyncStorage from './asyncStorageUtils';
export const writeJournal = async (journal) => {
  try {
    await AsyncStorage.appendDataToKey('journals', journal);
  } catch (e) {
    console.log(e);
    Alert.alert('Error', 'Cannot write journal');
  }
};

export const setJournalCover = async (journalDate, journalCover) => {
  try {
    await AsyncStorage.addFieldToArrayOfObjects(
      'journals',
      'date',
      journalDate,
      'journalCover',
      journalCover
    );
  } catch (e) {
    console.log(e);
    Alert.alert('Error', 'Cannot set journal cover');
  }
};

export const deleteJournal = async (journalDate) => {
  try {
    await AsyncStorage.deleteValueFromArr('journals', 'date', journalDate);
  } catch (e) {
    console.log(e);
    Alert.alert('Error', 'Cannot delete journal');
  }
};

export const getAllJournals = async () => {
  try {
    const journals = await AsyncStorage.getAllValuesFromKey('journals');
    return journals;
  } catch (e) {
    console.log(e);
    Alert.alert('Error', 'Cannot get all journals');
  }
};

export const deleteAllJournals = async () => {
  try {
    await AsyncStorage.deleteKey('journals');
  } catch (e) {
    console.log(e);
    Alert.alert('Error', 'Cannot delete all journals');
  }
};

export const overwriteJournal = async (date, newJournal) => {
  try {
    await AsyncStorage.overwriteObjectInArray(
      'journals',
      'date',
      date,
      newJournal
    );
  } catch (e) {
    console.log(e);
    Alert.alert('Error', 'Cannot overwrite journal');
  }
};
