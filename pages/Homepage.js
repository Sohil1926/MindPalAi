import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Button, Input } from '@rneui/themed';
import { useFonts, Manrope_400Regular } from '@expo-google-fonts/manrope';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding'; // import the Onboarding component

export default function Homepage({ navigation }) {
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
      setShowOnboarding(true); // set the state to show Onboarding
      // console.log('changed');
    }, 500);
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
      const date = new Date();
      await AsyncStorage.setItem(date.toUTCString(), input);
    } catch {
      console.error(error);
    }
  };
  if (!fontsLoaded) return null;

  if (showSplash) {
    return <SplashScreen />;
  }

  if (showOnboarding) {
    return (
      <Onboarding
        navigation={navigation}
        setShowOnboarding={setShowOnboarding}
      />
    );
  }

  return (
    <View
      className='flex-1 justify-top py-20 gap-5 bg-white'
      style={{ fontFamily: 'Manrope' }}
    >
      <StatusBar style='auto' />
      <Input
        style={styles.input}      
        multiline={true} // make the input box extend down as you type
        placeholder='write'
        className='text-white '
        onChangeText={(txt) => {
          setInput(txt);
        }}
      />
      <View className=' rounded-full flex flex-col space-y-4'>
        <Button
          className='gap-4 rounded-t-full	 my-2 space-y-4'
          color='black'
          title='Submit'
          onPress={callAPI}
        />

        <Button className='my-4' title='Save' onPress={saveText} />

        <Button
          className='mt-1'
          title='Go to Archive'
          onPress={() => navigation.navigate('JournalArchive')}
        />
      </View>
      <Text className='text-white'>{aiResponse}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 2, // add this to remove the thin line
  },
});

Homepage.navigationOptions = {
  headerShown: false,
};
