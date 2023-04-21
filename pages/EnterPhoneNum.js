import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
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

const PhoneNumber = ({ navigation, setShowOnboarding }) => {
  const goToHome = () => {
    if (textEntered) {
      navigation.navigate('VerifyCode');
    }
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

  const [textEntered, setTextEntered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (input) => {
    // Strip all characters from the input except digits
    let phoneNumber = input.replace(/\D/g, '');

    // Trim the remaining input to ten characters, to preserve phone number format
    phoneNumber = phoneNumber.substring(0, 10);

    // Based upon the length of the string, we add formatting as necessary
    let size = phoneNumber.length;
    if (size == 0) {
      phoneNumber = '';
    } else if (size < 4) {
      phoneNumber = phoneNumber;
    } else if (size < 7) {
      phoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      phoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    }

    // Return the formatted phone number
    return phoneNumber;
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>MindPal.</Text>
        <Text style={styles.subHeading}>Create your account using your phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          onChangeText={(text) => {
            const formattedPhoneNumber = formatPhoneNumber(text);
            setPhoneNumber(formattedPhoneNumber);
            setTextEntered(formattedPhoneNumber.length === 12);
          }}
          value={phoneNumber}
          keyboardType="phone-pad"
          maxLength={12} // limit the length of input
        />
      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text="continue"
          onPress={goToHome}
          disabled={!textEntered}
          bgColor={textEntered ? '#ffffff' : '#333333'}
          textColor={textEntered ? '#333333' : '#ffffff'}
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
    },
    bottomSection: {
      marginBottom: 50, // add this to create space for the button
    },
    button: { 
        fontFamily: 'Manrope_600SemiBold',
    }
  });
  

export default PhoneNumber;
