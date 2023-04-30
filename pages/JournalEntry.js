import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteValueFromArr,
  getValueUsingFieldVal,
} from '../utils/asyncStorageUtils';
import PillButton from '../components/PillButton';
import { Image } from '@rneui/base';

// import { createCompletion } from './openAI';
export default function JournalArchive({ navigation, route }) {
  const [journalEntry, setJournalEntry] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const getJournalEntry = async () => {
    try {
      const journal = await getValueUsingFieldVal(
        'journals',
        'date',
        route.params.key
      );
      // console.log(journal.journalCover);
      setJournalEntry(journal.entry);

      setImageUrl(
        journal.journalCover ||
          'https://thumbs.dreamstime.com/b/letter-block-word-null-wood-background-187721938.jpg'
      );
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
    <ScrollView className='flex-1 justify-top my-20 gap-5 bg-black'>
     <Text style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold', color: 'white', paddingTop: 30, paddingLeft: 30}}>
  {route.params.key}
</Text>

<Text style={{ color: 'white', paddingLeft: '15%' }}>
  {journalEntry}
</Text>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 300,
            height: 300,
            borderRadius: 20,
          }}
        />
      </View>
  
      <View>
        <PillButton
          text={'Delete'}
          onPress={delEntry}
          textColor='white'
          bgColor='#ff0f00'
        />
      </View>
    </ScrollView>
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
