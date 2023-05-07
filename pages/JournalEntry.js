import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  FlatList,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import PillButton from '../components/PillButton';
import { Image } from '@rneui/base';
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
import { deleteJournal, getAllJournals } from '../utils/journalUtils';

export default function JournalArchive({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const [journalEntry, setJournalEntry] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const getJournalEntry = async () => {
    try {
      // outdated method
      // const journal = await getValueUsingFieldVal(
      //   'journals',
      //   'date',
      //   route.params.key
      // );

      // const allJournals = await getAllValuesFromKey('journals');
      const allJournals = await getAllJournals();
      const journal = allJournals.find((j) => {
        const jDate = new Date(j.date).toISOString().split('T')[0];
        return jDate === route.params.key;
      });

      // console.log(journal.journalCover);
      setJournalEntry(journal.entry);

      setImageUrl(
        journal.journalCover ||
          'https://thumbs.dreamstime.com/b/letter-block-word-null-wood-background-187721938.jpg'
      );
    } catch (e) {
      // error reading value
      Alert.alert('Error', 'Something unexpected happened. Please try again.');
    }
  };

  const generateImage = async () => {
    setImageUrl('loading');

    let data = qs.stringify({
      input: `This is my's journal entry: "${journalEntry}"
        I want an image that represents my mood.`,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://openaibackend-nt11.onrender.com/dalle',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setImageUrl(response.data.response);
      })
      .catch((error) => {
        Alert.alert('Error', String(error));
        console.error(error);
      });
  };

  const delEntry = async () => {
    try {
      await deleteJournal(route.params.key);
      navigation.navigate('Homepage');
    } catch (e) {
      // error reading value
      Alert.alert(
        'Error',
        'Something unexpected happened. Please try again later.'
      );
    }
  };

  useEffect(() => {
    getJournalEntry();
  });
  if (!fontsLoaded) return null;

  return (
    <View className='flex-1 bg-black pt-20'>
      <Text style={styles.heading}>InnerScribe.</Text>

      <Text
        style={{
          textAlign: 'left',
          fontSize: 20,
          color: 'white',
          paddingTop: 30,
          paddingLeft: 30,
          fontFamily: 'Manrope_700Bold',
          paddingBottom: '5%',
        }}
      >
        {route.params.key}
      </Text>

      <ScrollView style={{ borderColor: 'white' }}>
        <Text
          style={{
            color: 'white',
            paddingLeft: '9%',
            fontFamily: 'Manrope_400Regular',
            fontSize: 16,
          }}
        >
          {journalEntry}
        </Text>
      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 300,
            height: 300,
            borderRadius: 20,
            marginTop: 50,
            marginBottom: 20,
          }}
        />
      </View>

      <View style={{ marginBottom: 30 }}>
        <PillButton
          text={'Delete'}
          onPress={delEntry}
          textColor='white'
          bgColor='#ff0f00'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginTop: '-10%',
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold',
    textAlign: 'center',
  },
});
