import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Button, Input } from '@rneui/themed';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Manrope_800ExtraBold,
  Manrope_400Regular,
} from '@expo-google-fonts/manrope';
import { getAllValuesFromKey } from '../utils/asyncStorageUtils';

export default function JournalArchive({ navigation }) {
  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
  });
  const [journalThumbnails, setJournalThumbnails] = useState([]);

  const [journalKeys, setJournalKeys] = useState([]);
  const last14Days = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last14Days.push(date);
  }
  const getAllJournals = async () => {
    try {
      const allJournals = await getAllValuesFromKey('journals');
        
      if (allJournals !== null) {
        const journals = {};
        const thumbnails = {};
        allJournals.forEach((j) => {
          journals[j.date] = { image: j.image, source: j.source };
          thumbnails[j.date] = j.thumbnail;          
        });
        setJournalKeys(journals);
        setJournalThumbnails(thumbnails);    
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something unexpected happened. Please try again later.'
      );
    }
  }; 
  

  useEffect(() => {
    const fetchData = async () => {
      await getAllJournals();
    }
    
    fetchData();
  }, []); // empty dependency array ensures this effect only runs on mount

  if (!fontsLoaded) return null;

  return (


    
    <View style={styles.container}>
    <Text style={styles.header}>Your Journals</Text>
    <View style={styles.box}>
  <Text style={styles.boxHeader}>Last 14 Days</Text>
  <View style={styles.calendar}>  
  {last14Days.map((date) => ( 
  <TouchableOpacity key={date} style={styles.calendarItem}>
  <Text style={styles.calendarDate}>{date.getDate()} </Text>
  {journalKeys[date.toDateString()] ? (
    journalThumbnails[date.toDateString()] ? (
      <Image
        source={{ uri: journalThumbnails[date.toDateString()] }}
        style={styles.calendarImage}
      />
    ) : (
      <Image
        source={{ uri: journalKeys[date.toDateString()].image }}
        style={styles.calendarImage}
      />
    )
  ) : (
    <View style={styles.calendarPlaceholder} />
  )}
  {journalKeys[date.toDateString()] && journalKeys[date.toDateString()].image && (
    <Image
      source={{ uri: journalKeys[date.toDateString()].image }}
      style={styles.calendarImage}
    />
  )}
</TouchableOpacity>

))}

</View>

</View>


    {journalKeys.length === 0 && (
      <Text style={styles.emptyMessage}>
        You haven't written any journals yet.
      </Text>
    )}
    <FlatList
      data={journalKeys}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('JournalEntry', { key: item })}
          style={styles.journalItemContainer}
        >
          <Text style={styles.journalItemText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
  
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#101010',
    padding: 20,
    paddingBottom: '60%',
    borderRadius: 10,
    marginBottom: 20,
  },
  boxHeader: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 17,
    color: '#fff',
    marginBottom: 10,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyMessage: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#fff',
  },
  journalItemContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#000',
    elevation: 3,
  },
  journalItemText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    color: '#fff',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calendarItem: {
    alignItems: 'center',
    width: '14%',
    aspectRatio: 1,
  },
  calendarDate: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  calendarImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  calendarPlaceholder: {
    width: 40,
    height: 60,
    backgroundColor: '#555',
    borderRadius: 10,
  },
  
});
