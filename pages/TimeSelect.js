import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from '@rneui/base';
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
import PillButton from '../components/PillButton';
import { getObjFromKey, setFieldToKey } from '../utils/asyncStorageUtils';
import JournalArchive from './JournalArchive';

const TimeSelect = ({ navigation, setShowOnboarding }) => {


  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });


  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>MindPal.</Text>
        <Text style={styles.subHeading}>
        Select one time every day that you can journal for 10 minutes.

You won’t be able to change this so pick a time that works everyday. 

         </Text>
      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text='continue'
          onPress={JournalArchive}
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
    paddingTop: 50, // add this to push the content down
    paddingHorizontal: 20, // add this for some horizontal padding
  },
  topSection: {
    flex: 1, // add this to take up remaining space
    justifyContent: 'flex-start', // add this to align content to top
    alignItems: 'center', // center horizontally
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
    marginBottom: 50, // add this to create space for the button
  },
  button: {
    fontFamily: 'Manrope_600SemiBold',
  },
});

export default TimeSelect;
