import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';

export default function Homepage({ navigation }) {
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Change the time (in milliseconds) as desired
  }, []);

  const callAPI = async () => {
    let data = qs.stringify({
      input: `This is someone's journal entry: "${input}"
      Ask a question to this person as if you were a therapist.`,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://openaibackend-nt11.onrender.com/gpt',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setAiResponse(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveText = async () => {
    try {
      // remove everything in storage
      // await AsyncStorage.clear();
      const date = new Date();
      // YYYY-MM-DD HH:MM:SS
      await AsyncStorage.setItem(date.toUTCString(), input);
    } catch {
      console.error(error);
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <View className='flex-1 justify-top py-20 gap-5 bg-black'>
      <StatusBar style="auto" />
      <Input
        placeholder='write'
        className='text-white '
        onChangeText={(txt) => {
          setInput(txt);
        }}
      />
      <Button className='my-1' color='black' title='Submit' onPress={callAPI} />
      <Button className='my-1' title='Save' onPress={saveText} />
      <Button
        className='mt-1'
        title='Go to Archive'
        onPress={() => navigation.navigate('JournalArchive')}
      />

      <Text className='text-white'>{aiResponse}</Text>
    </View>
  );
}

Homepage.navigationOptions = {
  headerShown: false,
};