import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { Input } from '@rneui/themed';
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
      <Button title='submit' onPress={() => console.log(input)} />
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
