import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
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
import { FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebaseConfig';
import firebase from 'firebase/compat/app';

const PhoneNumber = ({ navigation, setShowOnboarding }) => {  

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
  const [verificationId, setVerificationId] = useState(null);

  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {

    if (textEntered) {
      navigation.navigate('VerifyCode');
    }
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    
    phoneProvider
        .verifyPhoneNumber (phoneNumber, recaptchaVerifier.current)
       .then(setVerificationId);
       setPhoneNumber('');

    
  };

  
     

  const formatPhoneNumber = (input) => {
    // Strip all characters from the input except digits
    let phoneNumber = input.replace(/\D/g, '');

    // Trim the remaining input to ten characters, to preserve phone number format
    phoneNumber = phoneNumber.substring(0, 15);
    // Based upon the length of the string, we add formatting as necessary
    let size = phoneNumber.length;
    if (size == 0) {
      phoneNumber = '';
    } else if (size < 5) {
      phoneNumber = phoneNumber;
    } else if (size < 8) {
      phoneNumber = `+${phoneNumber.slice(0, 1)}-${phoneNumber.slice(1, 4)}-${phoneNumber.slice(4)}`;
    } else {
      phoneNumber = `+${phoneNumber.slice(0, 1)}-${phoneNumber.slice(1, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    }
    

    // Return the formatted phone number
    return phoneNumber;
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
         ref={recaptchaVerifier}
         firebaseConfig={firebaseConfig}
         />

      <View style={styles.topSection}>
        <Text style={styles.heading}>MindPal.</Text>
        <Text style={styles.subHeading}>Create your account using your phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="1-555-029-2932"
          placeholderTextColor="#444444" 
          onChangeText={(text) => {
            const formattedPhoneNumber = formatPhoneNumber(text);
            setPhoneNumber(formattedPhoneNumber);
            setTextEntered(formattedPhoneNumber.length === 12);
          }}
          value={phoneNumber}
          keyboardType="phone-pad"
          maxLength={15} // limit the length of input
        />

<View style={styles.termsContainer}>
  <Text style={styles.termsText}>
    By tapping “Continue,” you agree to our <TouchableOpacity onPress={() => console.log('Privacy Policy pressed')}>
      <Text style={styles.link}>Privacy Policy</Text>
    </TouchableOpacity> and <TouchableOpacity onPress={() => console.log('Terms of Service pressed')}>
      <Text style={styles.link}>Terms of Service.</Text>
    </TouchableOpacity>
  </Text>
</View>

      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text="continue"
          onPress={sendVerification}
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
        fontSize: 30,
        fontFamily: 'Manrope_800ExtraBold',
        color: 'white',
        backgroundColor: '#020202',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 5,
        width: '100%'
      },
      
    bottomSection: {
      marginBottom: 50, 
    },
    button: { 
        fontFamily: 'Manrope_600SemiBold',
    },

    termsText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 0,
        fontFamily: 'Manrope_500Medium',
        alignItems: 'center'

      },
      link: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Manrope_600SemiBold',
        alignItems: 'center',

      },

      termsContainer: { 
        position: 'absolute',
        bottom: 50, 
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
      }
  });
  

export default PhoneNumber;
