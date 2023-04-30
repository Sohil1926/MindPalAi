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
  const [journals, setJournals] = useState([]);
  const [last14Days, setLast14Days] = useState([]);

  const getAllJournals = async () => {
    try {
      const allJournals = await getAllValuesFromKey('journals');
      for (let i = 13; i >= 0; i--) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        setLast14Days((last14Days) => [...last14Days, dateStr]); // YYYY-MM-DD format
      }

      if (allJournals !== null) {
        // sort by date, newest first
        allJournals.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        // get last 14 days of journal
        const last14DaysJournals = allJournals.slice(0, 14);
        const journals_iterate = {};
        last14DaysJournals.forEach((j) => {
          journals_iterate[j.date] = { image: j.journalCover, entry: j.entry };
        });
        setJournals(journals_iterate);
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
    };

    fetchData();
  }, []); // empty dependency array ensures this effect only runs on mount

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Journals</Text>
      <View style={styles.box}>
        <Text style={styles.boxHeader}>Last 14 Days</Text>
        <View style={styles.calendar}>
          {journals?.length &&
            last14Days.map((date) => (
              // Note: date is in yyyy-mm-dd format
              <TouchableOpacity
                key={date}
                style={styles.calendarItem}
                onPress={() => {
                  if (journals[date] !== undefined)
                    navigation.navigate('JournalEntry', { key: date });
                  else alert(`No journal on ${date}`);
                }}
              >
                <Text style={styles.calendarDate}>{date.split('-')[2]} </Text>
                {journals[date] ? (
                  <Image
                    source={{ uri: journals[date]?.image }}
                    style={styles.calendarImage}
                  />
                ) : (
                  <View style={styles.calendarPlaceholder} />
                )}
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {journals.length === 0 && (
        <Text style={styles.emptyMessage}>
          You haven't written any journals yet.
        </Text>
      )}
      <FlatList
        data={journals}
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
    height: 60,
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
