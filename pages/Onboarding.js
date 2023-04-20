import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';
import {
  useFonts,
  Manrope_800ExtraBold,
  Manrope_400Regular,
} from '@expo-google-fonts/manrope';
import PillButton from '../components/PillButton';

const Onboarding = ({ navigation, setShowOnboarding }) => {
  const goToHome = () => { alert("zzzz");
    // setShowOnboarding(false);
   
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
        <Text style={styles.heading}>we’re only going to show this once. </Text>
        <Text style={styles.text}>
          think of this app like BeReal but for journalling.{' '}
        </Text>
        <Text style={styles.text}>
          its going to prompt you randomly 3 times a day to type how ur feeling
          in.{' '}
        </Text>
        <Text style={styles.text}>
          think of it like writing a tweet or smth
        </Text>
        <Text style={styles.text}>
          you’ll have a assistant to help you write till you have explored your
          thoughts{' '}
        </Text>
        <Text style={styles.text}>
          each time you submit you build your streak
        </Text>
        <Text style={styles.text}>
          all the stuff you write is stored locally on your device.{' '}
        </Text>
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

export default Onboarding;