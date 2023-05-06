import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import { Button } from '@rneui/base';
import axios from 'axios';
import qs from 'qs';
import PillButton from '../components/PillButton';
import JournalArchive from './JournalArchive';
import {
  addFieldToArrayOfObjects,
  deleteFieldFromObj,
  getObjFromKey,
  setFieldToKey,
} from '../utils/asyncStorageUtils';
import { deleteValueFromArr } from '../utils/asyncStorageUtils';

const JournalCover = ({ navigation, setShowOnboarding, route }) => {
  const journalEntry = route.params.journalEntry.entry || '';
  const [imageUrl, setImageUrl] = useState(null);
  const onContinue = () => {
    if (imageUrl !== null && imageUrl !== 'loading')
      navigation.navigate('Homepage');
    else return alert('Please wait for the image to generate.');
  };

  useEffect(() => {
    // Load image URL when component mounts
    // setImageUrl('https://example.com/image.jpg');
  }, []);
  useEffect(() => {
    if (journalEntry !== '') {
      generateImage();
    }
  }, [journalEntry]);

  const precheckBeforeGenerate = async () => {
    function isOneDateAtLeastOneDayLater(date1, date2) {
      const timestamp1 = date1.getTime();
      const timestamp2 = date2.getTime();

      return timestamp2 >= timestamp1 + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }
    const misc = await getObjFromKey('misc');
    const lastJCoverGeneratedDate = misc?.lastJournalCoverGeneratedDate;

    if (lastJCoverGeneratedDate === undefined) return true; // first time generating, good to continue

    // check if currentdate is greater than last generated date
    if (
      !isOneDateAtLeastOneDayLater(
        new Date(lastJCoverGeneratedDate),
        new Date()
      )
    ) {
      // throw new Error(
      //   'You already generated a journal cover for today, please come back tomorrow to generate a new one.'
      // );
      return false;
    }

    return true; // generate image
  };

  const generateImage = async () => {
    // const precheck = await precheckBeforeGenerate();
    await deleteFieldFromObj('misc', 'lastJournalCoverGeneratedDate'); // remove for production
    const precheck = true; // remove for production

    // Update as of May 4th, this will no longer be called, as new journals will simply gets overwritten and keeps the same journal cover
    if (!precheck) {
      alert(
        'You already generated a journal cover for today, please come back tomorrow to generate a new one.'
      );
      await addFieldToArrayOfObjects(
        'journals',
        'date',
        route.params.journalEntry.date,
        'journalCover',
        null
      );
      navigation.navigate('Homepage');
      return;
    }

    setImageUrl('loading');

    let data = qs.stringify({
      input: journalEntry,
      // input: journalEntry,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://us-central1-mindpal-gpt.cloudfunctions.net/myApp/leapImage',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    axios
      .request(config)
      .then(async (response) => {
        // console.log(JSON.stringify(response.data));
        setImageUrl(response.data.response);
        addFieldToArrayOfObjects(
          'journals',
          'date',
          route.params.journalEntry.date,
          'journalCover',
          response.data.response
        );
        await setFieldToKey(
          'misc',
          'lastJournalCoverGeneratedDate',
          new Date()
        );
      })
      .catch(async (error) => {
        Alert.alert('Error', String(error));
        console.error(error);
        // delete the current journal
        await deleteValueFromArr('journals', 'date', route.params.key);
        navigation.navigate('Homepage');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>InnerScribe.</Text>
        <Text style={styles.subHeading}>say hello to your journal cover</Text>
        {imageUrl === 'loading' && (
          <Text style={styles.subHeading}>Generating image...</Text>
        )}
        {imageUrl !== null && (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={{
              width: 319,
              height: 403,
              resizeMode: 'cover',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#FFF',
            }}
          />
        )}
      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text='continue'
          onPress={onContinue}
          bgColor={'#ffffff'}
          textColor={'#000000'}
          style={styles.button}
        />
      </View>
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
    fontSize: 35,
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
});

export default JournalCover;
