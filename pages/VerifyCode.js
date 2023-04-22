import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
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
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { auth, firebaseConfig } from '../firebaseConfig';
import firebase from 'firebase/compat/app';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';

const DEBUGMODE = false;

const VerifyCode = ({ navigation, route, setShowOnboarding }) => {
  const [textEntered, setTextEntered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [refreshCountdown, setRefreshCountdown] = useState(30);
  const [verificationId, setVerificationId] = useState(
    DEBUGMODE ? '123456' : route.params.id
  );
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

  useEffect(() => {
    if (refreshCountdown > 0) {
      setTimeout(() => {
        setRefreshCountdown(refreshCountdown - 1);
      }, 1000);
    }
  }, [refreshCountdown]);

  const confirmCode = async () => {
    if (!codeInput || codeInput.length < 6) {
      alert('Please enter the verification code.');
      return;
    }

    const credential = await PhoneAuthProvider.credential(
      verificationId,
      codeInput
    );

    signInWithCredential(auth, credential)
      .then(() => {
        alert('Signed in successfully');
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>MindPal.</Text>
        <Text style={styles.subHeading}>
          Enter the code we sent to +16478045565
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor='#444444'
          placeholder='292910'
          onChangeText={(text) => {
            setCodeInput(text);
            codeInput.length === 5 && Keyboard.dismiss();
          }}
          underlineColorAndroid='transparent'
          maxLength={6}
          keyboardType='phone-pad'
        />
      </View>
      <View
        style={{
          margin: 20,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          disabled={refreshCountdown === 0}
          onPress={() => navigation.navigate('PhoneNumber')}
        >
          {refreshCountdown === 0 ? (
            <Text style={styles.link}>Change Phone Number/Send Again.</Text>
          ) : (
            <Text style={styles.link}>
              Please wait {refreshCountdown} seconds
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text='continue'
          onPress={confirmCode}
          disabled={codeInput.length < 6}
          bgColor={codeInput.length < 6 ? '#ffffff' : '#333333'}
          textColor={codeInput.length < 6 ? '#333333' : '#ffffff'}
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
    marginBottom: '15%',
  },
  button: {
    fontFamily: 'Manrope_600SemiBold',
  },
  link: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Manrope_600SemiBold',
    alignItems: 'center',
  },
});

export default VerifyCode;
