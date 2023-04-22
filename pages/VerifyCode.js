import React, { useState, useRef } from 'react';
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
import { FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebaseConfig';
import firebase from 'firebase/compat/app';

const VerifyCode = ({ navigation, setShowOnboarding }) => {
  const goToHome = () => {
    if (textEntered) {
      navigation.navigate('Home');
    }
  };

  const [textEntered, setTextEntered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_500Medium,
    Manrope_600SemiBold, 
    Manrope_700Bold, 
  });
  const recaptchaVerifier = useRef(null);
  
  const confirmCode = () => {
    if (!code) {
      alert('Please enter the verification code.');
      return;
    }
  
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
  
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode('');
      })
      .catch((error) => {
        alert(error);
      });
  };
  


  return (
    <View style={styles.container}>
        
      <View style={styles.topSection}>
        <Text style={styles.heading}>MindPal.</Text>
        <Text style={styles.subHeading}>Enter the code we sent to +16478045565</Text>
        <TextInput
  style={styles.input}
  placeholderTextColor="#444444" 
  placeholder="292910"
  onChangeText={setCode} 
  underlineColorAndroid="transparent"
  maxLength={6}
  keyboardType="phone-pad"
/>

      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text="continue"
          onPress={confirmCode}
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
    }
  });
  

export default VerifyCode;
