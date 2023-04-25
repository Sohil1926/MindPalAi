import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button } from '@rneui/base';
import axios from 'axios';
import qs from 'qs';
import PillButton from '../components/PillButton';
import JournalArchive from './JournalArchive';
import {
  getAllValuesFromKey,
  getObjFromKey,
  setFieldToKey,
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

const Homepage = ({ navigation, setShowOnboarding, route }) => {
  //   const [journalEntry, setJournalEntry] = useState(route.params.journalEntry || '');
  const [imageUrl, setImageUrl] = useState(null);
  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  const goToTimeSelect = () => {
    navigation.navigate('TimeSelect');
  };

  useEffect(() => {
    const fetch = async () => {
      const journals = await getAllValuesFromKey('journals');
      if (journals === null || journals.length === 0) {
        return;
      }
      // sort journal by journal date, newest first
      journals.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      // first journal
      const journal = journals[0];
      setImageUrl(journal.journalCover);
    };
    const firstTimeOnload = async () => {
      const registrationData = await getObjFromKey('registrationData');

      auth.onAuthStateChanged(async (user) => {
        // edit this line in productions
        if (true) {
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

    firstTimeOnload();
    fetch();
  }, []);

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>MindPal.</Text>
      </View>
      <View style={styles.topSection}>
        <PillButton
          text='my friends'
          bgColor={'#fff'}
          textColor={'#000'}
          onPress={() => navigation.navigate('FindFriends')}
        />

        {imageUrl !== null && (
          <Image
            source={{
              uri: imageUrl,
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
        <PillButton
          text='+ ADD FRIENDS'
          bgColor={'#fff'}
          textColor={'#000'}
          style={styles.skipButton}
          onPress={() => navigation.navigate('FindFriends')}
        />
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
