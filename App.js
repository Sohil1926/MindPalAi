import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';

// import { createCompletion } from './openAI';
import { useEffect, useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const callAPI = async () => {
    let data = qs.stringify({
      input,
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
  return (
    <View className="flex-1 items-center justify-center bg-black">  
      <Input
      placeholder='write'
      onChangeText={(txt) => {
        setInput(txt);
      }}
    />
      <Button title='submit' onPress={callAPI} />
      <Text>{aiResponse}</Text>
    </View>
  );
}

