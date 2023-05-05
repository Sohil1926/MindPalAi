import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Button } from '@rneui/base';
import axios from 'axios';
import qs from 'qs';
import PillButton from '../components/PillButton';
import JournalArchive from './JournalArchive';
import {
  deleteKey,
  getAllValuesFromKey,
  getObjFromKey,
  getVal,
  setFieldToKey,
  setKeyToVal,
} from '../utils/asyncStorageUtils';
import { addData, checkDocumentExists } from '../utils/firebaseUtil';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
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
// import Constants from 'expo-constants';
import uuid from 'react-native-uuid';
import { useIsFocused } from '@react-navigation/native';

const Homepage = ({ navigation, setShowOnboarding, route }) => {
  //   const [journalEntry, setJournalEntry] = useState(route.params.journalEntry || '');
  const [imageUrl, setImageUrl] = useState(null);
  const [newestJournal, setNewestJournal] = useState(null);
  const isFocused = useIsFocused();
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
    const firstTimeOnload = async () => {
      // await deleteFieldFromObj('misc', 'lastJournalCoverGeneratedDate'); // remove for production

      const registrationData = await getObjFromKey('registrationData');
      // set logged in to true in async storage
      await setFieldToKey('account', 'loggedIn', true);
      let arbDeviceId = await getVal('deviceId');
      if (arbDeviceId === null) {
        arbDeviceId = uuid.v4();
        // console.log(arb);
        await setKeyToVal('deviceId', arbDeviceId);
        console.log('Device registered', arbDeviceId);
      }

      const userObjExistInDB = await checkDocumentExists('users', arbDeviceId);
      if (!userObjExistInDB) {
        // add user to db
        await addData('users', arbDeviceId, {
          name: registrationData['name'] || 'Anonymous',
          phoneNumber: registrationData['phoneNumber'] || null,
        });
        console.log('user added to db');
      }

      // auth.onAuthStateChanged(async (user) => {
      //   // edit this line in productions
      //   if (user) {

      // updateProfile(auth.currentUser, {
      //   displayName: registrationData['name'],
      // }).then(async () => {

      //   }
      // });

      //     });
      //   }
    };

    firstTimeOnload();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const journals = await getAllValuesFromKey('journals');
      if (journals === null || journals.length === 0) {
        setNewestJournal(null);
        return;
      }
      // await deleteKey('journals'); // remove for production

      // sort journal by journal date, newest first
      journals.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      // get first journal where the journal cover is not null
      const journal = journals.find((journal) => journal.journalCover !== null);
      if (journal === undefined) {
        return;
      }

      setNewestJournal(journal);
    };

    if (isFocused) fetch();
  }, [navigation, isFocused]);

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>InnerScribe.</Text>
      </View>
      <View style={styles.topSection}>
        {/* Uncomment this for development */}
        {/* <PillButton
          text='my friends'
          bgColor={'#fff'}
          textColor={'#000'}
          onPress={() => navigation.navigate('FindFriends')}
        /> */}

        {newestJournal !== null && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('JournalEntry', { key: newestJournal.date })
            }
          >
            <Image
              source={{
                uri: newestJournal.journalCover,
              }}
              style={{
                width: 173,
                height: 183,
                resizeMode: 'cover',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#FFF',
                marginTop: '8%',
              }}
            />
          </TouchableOpacity>
        )}
        <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
          <PillButton
            text='Add a caption...'
            bgColor={'transparent'}
            textColor={'#fff'}
            style={styles.skipButton}
            onPress={() => navigation.navigate('Homepage')}
          />
        </KeyboardAvoidingView>
        <Text style={styles.friendText}>
          Your friends haven’t posted their journal yet. Add even more friends.{' '}
        </Text>
      </View>
      <View style={{ gap: 10 }}>
        <PillButton
          text='WRITE A JOURNAL'
          bgColor={'#fff'}
          textColor={'#000'}
          style={styles.skipButton}
          onPress={() => navigation.navigate('WriteJournal')}
        />
        <PillButton
          text='VIEW MY ARCHIVE'
          bgColor={'#fff'}
          textColor={'#000'}
          style={styles.skipButton}
          onPress={() => navigation.navigate('JournalArchive')}
        />
        {/* Uncomment this for development */}
        {/* <PillButton
          text='+ ADD FRIENDS'
          bgColor={'#fff'}
          textColor={'#000'}
          style={styles.skipButton}
          onPress={() => navigation.navigate('FindFriends')}
        /> */}
      </View>
      <View style={styles.bottomSection}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  iconButton: {
    marginRight: 10,
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
    fontSize: 15,
    fontFamily: 'Manrope_800ExtraBold',
    color: 'white',
    backgroundColor: '#020202',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 5,
    width: '100%',
  },
  bottomSection: {
    marginBottom: 50,
  },
  button: {
    fontFamily: 'Manrope_600SemiBold',
  },
  friendText: {
    color: '#fff',
    fontFamily: 'Manrope_500Medium',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: '5%',
  },
});

export default Homepage;
