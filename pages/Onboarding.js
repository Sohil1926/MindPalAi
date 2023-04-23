import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
import { getObjFromKey } from '../utils/asyncStorageUtils';

const Onboarding = ({ navigation, setShowOnboarding }) => {
  const gotoName = () => {
    // setShowOnboarding(false);

    navigation.navigate('Name');
  };

  useEffect(() => {
    const fetch = async () => {
      let accountData = await getObjFromKey('account');

      if (accountData?.loggedIn) {
        // alert('You are already logged in');
        return navigation.navigate('WriteJournal');
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

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.heading}>we’re only going to show this once. </Text>
        <Text style={styles.text}>
          think of this app like BeReal but for journalling.{' '}
        </Text>
        <Text style={styles.text}>
          you select one time to journal everyday for 10 min{' '}
        </Text>
        <Text style={styles.text}>
          you’ll have a assistant to help you write till you have explored your
          thoughts{' '}
        </Text>
        <Text style={styles.text}>
          each time you submit you build your streak. You can also generate cool
          artwork to share with friends.
        </Text>
        <Text style={styles.text}>
          all the stuff you write is stored locally on your device.{' '}
        </Text>
        <View style={styles.buttonContainer}>
          <PillButton
            text='Get Started'
            onPress={gotoName}
            bgColor={'#F4B400'}
            textColor='white'
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 40,
    paddingRight: 70,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    paddingRight: 24,
    paddingBottom: 20,
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold',
  },
  text: {
    fontSize: 18,
    fontWeight: 'normal',
    paddingBottom: 20,
    paddingRight: 24,
    color: 'white',
    fontFamily: 'Manrope_400Regular',
  },
});

export default Onboarding;
