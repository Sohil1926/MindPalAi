import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import {
  useFonts,
  Manrope_800ExtraBold,
  Manrope_400Regular,
} from '@expo-google-fonts/manrope';

const Onboarding = ({ navigation, setShowOnboarding }) => {
  const goToHome = () => {
    setShowOnboarding(false);
    navigation.navigate('Home');
  };

  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View className='bg-black h-screen p-5'>
      <View>
        <Text
          style={{
            fontFamily: 'Manrope_800ExtraBold',
            fontSize: 30,
            fontWeight: 'bold',
          }}
          className='text-2xl font-semibold pr-24 pb-4 text-white	'
        >
          we’re only going to show this once.{' '}
        </Text>
        <Text
          style={{ fontFamily: 'Manrope_400Regular', fontSize: 15 }}
          className='text-xl font-normal pb-4 pr-24 text-white	'
        >
          think of this app like BeReal but for journalling.{' '}
        </Text>
        <Text
          style={{ fontFamily: 'Manrope_400Regular', fontSize: 15 }}
          className='text-xl font-normal  pb-4 pr-24 text-white	'
        >
          its going to prompt you randomly 3 times a day to type how ur feeling
          in.{' '}
        </Text>
        <Text
          style={{ fontFamily: 'Manrope_400Regular', fontSize: 15 }}
          className='text-xl font-normal  pb-4 pr-24 text-white	'
        >
          think of it like writing a tweet or smth{' '}
        </Text>
        <Text
          style={{ fontFamily: 'Manrope_400Regular', fontSize: 15 }}
          className='text-xl font-normal  pr-24 text-white	'
        >
          you’ll have a assistant to help you write till you have explored your
          thoughts{' '}
        </Text>
        <Text
          style={{ fontFamily: 'Manrope_400Regular', fontSize: 15 }}
          className='text-xl font-normal pb-4 pr-24 text-white	'
        >
          each time you submit you build your streak{' '}
        </Text>
        <Text
          style={{ fontFamily: 'Manrope_400Regular', fontSize: 15 }}
          className='text-xl font-normal pb-4 pr-24 text-white	'
        >
          all the stuff you write is stored locally on your device.{' '}
        </Text>
        <View className='border'>
          <Button
            styles={{ fontFamily: 'Manrope_400Regular' }}
            className='rounded-full border-white'
            title='Get Started'
            onPress={goToHome}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default Onboarding;
