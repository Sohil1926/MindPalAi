import * as AsyncStorage from './asyncStorageUtils';

export const writeJournal = async (journal) =>
  await AsyncStorage.appendDataToKey('journals', journal);

export const setJournalCover = async (journalDate, journalCover) =>
  await AsyncStorage.addFieldToArrayOfObjects(
    'journals',
    'date',
    journalDate,
    'journalCover',
    journalCover
  );
export const deleteJournal = async (journalDate) =>
  await AsyncStorage.deleteValueFromArr('journals', 'date', journalDate);
