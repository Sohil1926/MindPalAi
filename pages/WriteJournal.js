import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';
import { Text, Button, Input } from '@rneui/themed';
import {
  useFonts,
  Manrope_800ExtraBold,
  Manrope_400Regular,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import axios from 'axios';
import qs from 'qs';
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding'; // import the Onboarding component
import {
  appendDataToKey,
  deleteFieldFromObj,
  getObjFromKey,
  overwriteObjectInArray,
  setFieldToKey,
} from '../utils/asyncStorageUtils';
import PillButton from '../components/PillButton';
import CustomModal from '../components/Modal';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { addData, checkDocumentExists } from '../utils/firebaseUtil';
import { HideKeyboard } from '../components/HideKeyboard';
import { deleteValueFromArr } from '../utils/asyncStorageUtils';
import { reloadAsync } from 'expo-updates';

export default function WriteJournal({ navigation }) {
  const [input, setInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGPTInsight, setShowGPTInsight] = useState(false);
  const [loadingGPT, setLoadingGPT] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);

  const BTNCOLOR = {
    save: '#fff',
    archive: '#007bff',
    submit: '#6c757d',
  };

  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    //for debugging onboarding screen, comment this line out else it will show every time.
    // deleteFieldFromObj('misc', 'showOnboarding');

    const firstTimeOnload = async () => {
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
              // add user to db
              await addData('users', user.uid, {
                name: registrationData['name'],
                phoneNumber: registrationData['phoneNumber'],
              });
            }
          });
        }
      });
    };

    // note: this is now being called in homepage
    // firstTimeOnload();
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
      // only get YYYY-MM-DD
      const dateFormatted = new Date().toISOString().split('T')[0];

      // get all journals
      const allJournals = await getObjFromKey('journals');
      if (allJournals && allJournals.length) {
        // sort journal to get the newest one
        const sortedJournals = allJournals?.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        const newestJournalDateFormatted = new Date(sortedJournals[0].date)
          .toISOString()
          .split('T')[0]; // although it is likely that the date is already in YYYY-MM-DD format, we still do this to be safe

        // if there is a journal entry for today, ask user if they want to overwrite it
        if (newestJournalDateFormatted === dateFormatted) {
          return Alert.alert(
            'Warning',
            "Would you like to overwrite today's entry? (Your artwork will remain)",
            [
              {
                text: 'Cancel',
                onPress: () => navigation.navigate('Homepage'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: async () => {
                  // today's journal
                  const todayJournal = sortedJournals[0];
                  // overwrite journal entry
                  await overwriteObjectInArray(
                    'journals',
                    'date',
                    dateFormatted,
                    {
                      ...todayJournal,
                      entry: input,
                    }
                  );
                  reloadAsync();
                  return navigation.navigate('Homepage');
                },
              },
            ]
          );
        }

        const newJournalEntry = { date: dateFormatted, entry: input };
        appendDataToKey('journals', newJournalEntry);
        Alert.alert('Success', 'Journal saved successfully', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('JournalCover', {
                journalEntry: newJournalEntry,
              }),
          },
        ]);
      } else {
        // user's first journal!
        const newJournalEntry = { date: dateFormatted, entry: input };
        appendDataToKey('journals', newJournalEntry);
        Alert.alert('Success', 'Journal saved successfully', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('JournalCover', {
                journalEntry: newJournalEntry,
              }),
          },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (!fontsLoaded) return null;

  // else {
  //   if (showSplash) {
  //     return <SplashScreen />;
  //   }

  //   if (showOnboarding) {
  //     return (
  //       <Onboarding
  //         navigation={navigation}
  //         setShowOnboarding={setShowOnboarding}
  //       />
  //     );
  //   }
  // }

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.heading}>InnerScribe.</Text>
          <Text style={styles.subHeading}>try writing a journal </Text>
        </View>
        <StatusBar style='auto' />
        <Input
          style={styles.input}
          multiline={true}
          placeholder='ex. today i learned how to cook spaghetti. it was such a nice experience and i felt really calm afterwards'
          className='text-white '
          onChangeText={(txt) => {
            setInput(txt);
            setInputFilled(txt !== '');
          }}
        />
        <View className='flex flex-col'>
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
              bgColor={BTNCOLOR.save}
            />

            {/* <TouchableOpacity // replace Button with TouchableOpacity
            style={[styles.button, styles.saveButton]} // add custom styles
            onPress={saveJournal}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity> */}
          </View>

          {/* <TouchableOpacity // replace Button with TouchableOpacity
          style={[styles.button, styles.archiveButton]} // add custom styles
          onPress={() => navigation.navigate('JournalArchive')}
        >
          <Text style={styles.buttonText}>Go to Archive</Text>
        </TouchableOpacity> */}
          {/* <PillButton
          onPress={() => navigation.navigate('JournalArchive')}
          text={'See My Archive'}
          bgColor={BTNCOLOR.archive}
        /> */}
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

        <View style={styles.bottomSection}>
          <PillButton
            text='save journal'
            style={styles.button}
            bgColor={inputFilled ? BTNCOLOR.save : BTNCOLOR.submit}
            onPress={saveJournal}
          />

          <PillButton
            onPress={() => navigation.navigate('JournalArchive')}
            text={'View my Journal Archives'}
            bgColor={BTNCOLOR.save}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </HideKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topSection: {
    // marginTop: '20%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    paddingBottom: 20,
    color: 'white',
    fontFamily: 'Manrope_600SemiBold',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 200,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 8,
    fontFamily: 'Manrope_600SemiBold',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '40%',
    height: 40,
  },
  bottomSection: {
    marginBottom: '4%',
    flex: 1,
    gap: 10,
    // justifyContent: 'flex-end'
  },
});

WriteJournal.navigationOptions = {
  headerShown: false,
};
