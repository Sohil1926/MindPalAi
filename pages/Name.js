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

const Name = ({ navigation, setShowOnboarding }) => {
  const onNext = async () => {
    if (name) {
      await setFieldToKey('registrationData', 'name', name);
      // await setFieldToKey('registrationData', 'phoneNumber', null); // for temp release
      navigation.navigate('Homepage');
    } else {
      alert('Please enter your name before continuing.');
    }
  };

  useEffect(() => {
    const fetch = async () => {
      let accountData = await getObjFromKey('account');

      if (accountData?.loggedIn) {
        alert('You are already logged in');
        return navigation.navigate('WriteJournal');
      }

      let registrationData = await getObjFromKey('registrationData');

      if (registrationData['name']) {
        alert('We already have your name');
        return navigation.navigate('PhoneNumber');
      }
    };

    fetch();
  }, []);

  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const [name, setName] = useState('');

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>InnerScribe.</Text>
        <Text style={styles.subHeading}>
          let’s get started, what’s your name?
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your name'
          placeholderTextColor='#444444'
          onChangeText={setName}
          underlineColorAndroid='transparent'
        />
      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text='continue'
          onPress={onNext}
          disabled={!name}
          bgColor={name ? '#ffffff' : '#333333'}
          textColor={name ? '#333333' : '#ffffff'}
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

export default Name;
