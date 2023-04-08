import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Button, Input } from '@rneui/themed';
import { useFonts, Manrope_400Regular } from '@expo-google-fonts/manrope';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding'; // import the Onboarding component
import { TouchableOpacity } from 'react-native'; // import TouchableOpacity
import {
  appendDataToKey,
  deleteFieldFromObj,
  getObjFromKey,
  setFieldToKey,
} from '../utils/asyncStorageUtils';

export default function Homepage({ navigation }) {
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
  });

  useEffect(() => {
    //for debugging onboarding screen, comment this line out else it will show every time.
    // deleteFieldFromObj('misc', 'showOnboarding');
    setTimeout(async () => {
      setShowSplash(false);
      const misc = await getObjFromKey('misc');

      if (
        misc === null ||
        misc['showOnboarding'] === undefined ||
        misc['showOnboarding'] === true
      ) {
        setShowOnboarding(true);
        await setFieldToKey('misc', 'showOnboarding', false); // don't show onboarding screen again
      }
    }, 3000);
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
  const saveJournal = async () => {
    if (input === '') {
      return console.log("You can't save an empty journal");
    }
    try {
      const date = new Date();
      appendDataToKey('journals', { date: date.toString(), entry: input });
      Alert.alert('Success', 'Journal saved successfully');
    } catch {
      Alert.alert('Error', 'Something went wrong');
    }
  };
  if (!fontsLoaded) return null;
  else {
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
  }

  return (
    <View
      className='flex-1 justify-top py-20 gap-5 bg-black'
      style={{ fontFamily: 'Manrope_400Regular' }}
    >
      <StatusBar style='auto' />
      <Input
        style={styles.input}
        multiline={true}
        placeholder='write'
        className='text-white '
        onChangeText={(txt) => {
          setInput(txt);
        }}
      />
      <View className='flex flex-col space-y-4'>
        <View className='flex flex-row space-x-4'>
          <TouchableOpacity // replace Button with TouchableOpacity
            style={[styles.button, styles.submitButton]} // add custom styles
            onPress={callAPI}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity // replace Button with TouchableOpacity
            style={[styles.button, styles.saveButton]} // add custom styles
            onPress={saveJournal}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity // replace Button with TouchableOpacity
          style={[styles.button, styles.archiveButton]} // add custom styles
          onPress={() => navigation.navigate('JournalArchive')}
        >
          <Text style={styles.buttonText}>Go to Archive</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 2,
    color: 'white',
    marginHorizontal: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  submitButton: {
    backgroundColor: '#fff',
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#6c757d',
  },
  archiveButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

Homepage.navigationOptions = {
  headerShown: false,
};
