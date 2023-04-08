import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { delValueFromKey, getValueFromKey } from '../utils/asyncStorageUtils';

// import { createCompletion } from './openAI';
export default function JournalArchive({ navigation, route }) {
  const [journalEntry, setJournalEntry] = useState('');

  const getJournalEntry = async () => {
    try {
      const journal = await getValueFromKey(
        'journals',
        'date',
        route.params.key
      );
      // console.log(journal);
      setJournalEntry(journal.entry);
    } catch (e) {
      // error reading value
      Alert.alert('Error', 'Something unexpected happened. Please try again.');
    }
  };

  const delEntry = async () => {
    try {
      await delValueFromKey('journals', 'date', route.params.key);
      navigation.navigate('JournalArchive');
    } catch (e) {
      // error reading value
      Alert.alert(
        'Error',
        'Something unexpected happened. Please try again later.'
      );
    }
  };

  useEffect(() => {
    getJournalEntry();
  });

  return (
    <View className='flex-1 justify-top py-20 gap-5 bg-black'>
      <Text className='text-white'>{journalEntry}</Text>
      <Button title={'Delete'} onPress={delEntry} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
