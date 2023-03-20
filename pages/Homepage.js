import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { createCompletion } from './openAI';
import { useEffect, useState } from 'react';

export default function Homepage({ navigation }) {
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

  return (
    <View className='flex-1 justify-top py-20 gap-5 bg-black'>
      <Input
        placeholder='write'
        className='text-white '
        onChangeText={(txt) => {
          setInput(txt);
        }}
      />
      <Button className='my-1' title='Submit' onPress={callAPI} />
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
