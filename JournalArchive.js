import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import { createCompletion } from './openAI';
export default function JournalArchive({navigation}) {
    const [keys, setKeys] = useState([]);
    

    const getStored = async () => {
        try {
          const storageKeys = await AsyncStorage.getAllKeys();
          setKeys(storageKeys)
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        getStored();
      });

  return (
    <View className='flex-1 justify-top py-20 gap-5 bg-black'>
      <FlatList
        data={keys}
        renderItem={({item}) => 
        
        
        <Button onPress={() =>
            navigation.navigate('JournalEntry', {key: item})
          }>{item}</Button>} //{name: 'Jane'}
      />
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
