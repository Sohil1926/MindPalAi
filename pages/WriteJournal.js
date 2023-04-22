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
import {
  appendDataToKey,
  deleteFieldFromObj,
  getObjFromKey,
  setFieldToKey,
} from '../utils/asyncStorageUtils';
import PillButton from '../components/PillButton';
import CustomModal from '../components/Modal';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { addData, checkDocumentExists } from '../utils/firebaseUtil';

export default function WriteJournal({ navigation }) {
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGPTInsight, setShowGPTInsight] = useState(false);
  const [loadingGPT, setLoadingGPT] = useState(false);

  const BTNCOLOR = {
    save: '#6c757d',
    archive: '#007bff',
    submit: '#fff',
  };

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
  });

  useEffect(() => {
    //for debugging onboarding screen, comment this line out else it will show every time.
    // deleteFieldFromObj('misc', 'showOnboarding');
    setShowSplash(false);

    const cacheResult = async () => {
      const registrationData = await getObjFromKey('registrationData');

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // set logged in to true in async storage
          await setFieldToKey('account', 'loggedIn', true);

          updateProfile(auth.currentUser, {
            displayName: registrationData['name'],
          }).then(async () => {
            const userObjExistInDB = await checkDocumentExists(
              'users',
              user.uid
            );
            if (!userObjExistInDB) {
              await addData('users', user.uid, {
                name: registrationData['name'],
                phoneNumber: registrationData['phoneNumber'],
              });
            }
          });
          // console.log(registrationData);
        }
      });
    };

    cacheResult();

    // setTimeout(async () => {
    //   setShowSplash(false);
    //   const misc = await getObjFromKey('misc');
    //   if (
    //     misc === null ||
    //     misc['showOnboarding'] === undefined ||
    //     misc['showOnboarding'] === true
    //   ) {
    //     setShowOnboarding(true);
    //     await setFieldToKey('misc', 'showOnboarding', false); // don't show onboarding screen again
    //   }
    // }, 500);
  }, []);

  const callAPI = async () => {
    setLoadingGPT(true);
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
        setShowGPTInsight(true);
        setLoadingGPT(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveJournal = async () => {
    if (input === '') {
      return Alert.alert('Wait...', 'Please write a journal entry first');
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
        <View className='flex flex-row justify-between mb-5'>
          {/* <TouchableOpacity // replace Button with TouchableOpacity
            style={[styles.button, styles.submitButton]} // add custom styles
            onPress={callAPI}
          >
            <Text style={styles.buttonText}>Request Insight</Text>
          </TouchableOpacity> */}

          <PillButton
            onPress={callAPI}
            text={'Request Insight'}
            bgColor={BTNCOLOR.submit}
          />

          {/* <TouchableOpacity // replace Button with TouchableOpacity
            style={[styles.button, styles.saveButton]} // add custom styles
            onPress={saveJournal}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity> */}
          <PillButton
            onPress={saveJournal}
            text={'Save'}
            bgColor={BTNCOLOR.save}
          />
        </View>

        {/* <TouchableOpacity // replace Button with TouchableOpacity
          style={[styles.button, styles.archiveButton]} // add custom styles
          onPress={() => navigation.navigate('JournalArchive')}
        >
          <Text style={styles.buttonText}>Go to Archive</Text>
        </TouchableOpacity> */}
        <PillButton
          onPress={() => navigation.navigate('JournalArchive')}
          text={'See My Archive'}
          bgColor={BTNCOLOR.archive}
        />
      </View>
      <CustomModal
        modalVisible={showGPTInsight}
        setModalVisible={setShowGPTInsight}
        text={aiResponse}
      />
      <CustomModal
        modalVisible={loadingGPT}
        showHideButton={false}
        text={'Loading...'}
      />
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
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

WriteJournal.navigationOptions = {
  headerShown: false,
};
