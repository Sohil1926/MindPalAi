import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from '@rneui/base';
import {
  useFonts,
  Manrope_800ExtraBold,
  Manrope_400Regular,
} from '@expo-google-fonts/manrope';
import PillButton from '../components/PillButton';

const Name = ({ navigation, setShowOnboarding }) => {
  const goToHome = () => {
    alert("zzzz");
    navigation.navigate('Home');
  };

  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>MindPal</Text>
        <Text style={styles.subHeading}>let’s get started, what’s your name?</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />
        <PillButton
          text='Get Started'
          onPress={goToHome}
          bgColor={'#F4B400'}
          textColor='white'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 24,
    fontWeight: 'normal',
    paddingBottom: 20,
    color: 'white',
    fontFamily: 'Manrope_400Regular',
    textAlign: 'center',
  },
  input: {
    fontSize: 35,
    fontWeight: 'normal',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Name;
