import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';
import {
  useFonts,
  Manrope_800ExtraBold,
  Manrope_400Regular,
} from '@expo-google-fonts/manrope';
import PillButton from '../components/PillButton';
import { Input } from '@rneui/themed';

const SMSSignIn = ({ navigation, setShowOnboarding }) => {
  const goToBoarding = () => {
    setShowOnboarding(false);
    navigation.navigate('Onboarding');
  };

  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View>
        <Input placeholder='Phone Number' />
        <PillButton
          text='Sign In with Phone Number'
          onPress={goToBoarding}
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
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 24,
    paddingBottom: 4,
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    paddingBottom: 4,
    paddingRight: 24,
    color: 'white',
    fontFamily: 'Manrope_400Regular',
  },
  button: {
    width: 300,
    backgroundColor: '#F4B400',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SMSSignIn;
