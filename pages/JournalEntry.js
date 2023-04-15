import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteValueFromArr,
  getValueFromKey,
} from '../utils/asyncStorageUtils';
import PillButton from '../components/PillButton';
import { Image } from '@rneui/base';

// import { createCompletion } from './openAI';
export default function JournalArchive({ navigation, route }) {
  const [journalEntry, setJournalEntry] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

  const generateImage = async () => {
    setImageUrl('loading');
    let data = qs.stringify({
      input: `This is my's journal entry: "${journalEntry}"
      I want an image that represents my mood.`,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://openaibackend-nt11.onrender.com/dalle',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setImageUrl(response.data.response);
      })
      .catch((error) => {
        Alert.alert('Error', String(error));
        console.error(error);
      });
  };

  const delEntry = async () => {
    try {
      await deleteValueFromArr('journals', 'date', route.params.key);
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
      <Text className='text-white mx-5'>{journalEntry}</Text>
      <View className='flex flex-1 gap-4'>
        <PillButton
          text={'Show my mood'}
          onPress={generateImage}
          textColor='white'
          bgColor='#1E5945'
        />
        <PillButton
          text={'Delete'}
          onPress={delEntry}
          textColor='white'
          bgColor='#ff0f00'
        />
      </View>
      {imageUrl === 'loading' && (
        <Text>loading your mood as a painting...</Text>
      )}
      {imageUrl !== '' && imageUrl !== 'loading' && (
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      )}
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
