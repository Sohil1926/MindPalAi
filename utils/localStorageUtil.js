import * as AsyncStorage from './asyncStorageUtils';

export const setLastJournalCoverDate = async (date) =>
  await AsyncStorage.setKeyToVal('lastJournalCoverDate', date);

export const getLastJournalCoverDate = async () =>
  await AsyncStorage.getVal('lastJournalCoverDate');

export const incrementNumberOfRequestInsights = async (date) => {
  const lastRequest = await AsyncStorage.getObjFromKey(
    'numberOfRequestInsights'
  );
  const compare = (date1, date2) => {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    // make sure they are at least 1 day in between
    return d2 >= d1 + 24 * 60 * 60 * 1000;
  };
  if (lastRequest === null) {
    return await AsyncStorage.setKeyToJson('numberOfRequestInsights', {
      date: date,
      num: 1,
    });
  }
  const lastDate = lastRequest?.date,
    lastNum = lastRequest?.num;
  if (compare(lastDate, date)) {
    // they are 1 day apart
    return await AsyncStorage.setKeyToJson('numberOfRequestInsights', {
      date: date,
      num: 1,
    });
  } else {
    // they are the same day
    return await AsyncStorage.setKeyToJson('numberOfRequestInsights', {
      date: date,
      num: lastNum + 1,
    });
  }
};
