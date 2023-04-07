import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
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
      }, []);

  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'black' }}>
      <FlatList
        data={keys}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('JournalEntry', {key: item})}
            style={{ borderWidth: 2, borderColor: 'white', padding: 10, borderRadius: 10, marginVertical: 5 }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}