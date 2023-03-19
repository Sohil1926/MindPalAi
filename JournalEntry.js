import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import { createCompletion } from './openAI';
export default function JournalArchive({navigation, route}) {
    const [JournalEntry, setJournalEntry] = useState('');
    

    const getJournalEntry = async () => {
        try {
            const value = await AsyncStorage.getItem(route.params.key)
            setJournalEntry(value) 
          } catch(e) {
            // error reading value
          }
      };

      useEffect(() => {
        getJournalEntry();
      });

  return (
    <View className='flex-1 justify-top py-20 gap-5 bg-black'>
   <Text> 
   {JournalEntry}
    </Text>
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
