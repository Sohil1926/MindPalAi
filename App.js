import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { Input } from '@rneui/themed';
import axios from 'axios';

// import { createCompletion } from './openAI';
import { useEffect, useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />

      <Input
        placeholder='write'
        onChangeText={(txt) => {
          setInput(txt);
        }}
      />
      <Button title='submit' onPress={() => 
      { 
        axios.post('https://openaibackend-nt11.onrender.com/gpt', {
          input: input,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
