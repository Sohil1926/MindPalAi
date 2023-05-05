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
import axios, { all } from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from 'react-native-vector-icons';

import {
  useFonts,
  Manrope_800ExtraBold,
  Manrope_400Regular,
} from '@expo-google-fonts/manrope';
import { getAllValuesFromKey } from '../utils/asyncStorageUtils';
import JournalCalendar from '../components/JournalCalendar';
import PillButton from '../components/PillButton';

export default function JournalArchiveAll({ navigation }) {
  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Manrope_400Regular,
  });
  const [journals, setJournals] = useState({});
  // const [loading, setLoading] = useState(false); // Set loading to true on component mount
  const date = new Date();

  const [month, setMonth] = useState(
    Number(date.toLocaleString('default', { month: 'numeric' }))
  );
  const [monthLong, setMonthLong] = useState(
    date.toLocaleString('default', { month: 'long' })
  );
  const [year, setYear] = useState(date.getFullYear());
  const handleBackPress = () => {
    try {
      navigation.goBack();
    } catch (err) {
      navigation.navigate('Homepage');
    }
  };

  const getAllJournalsOfCurrentMonth = async () => {
    try {
      getJournalsMonthYear(year, month);
    } catch (error) {
      Alert.alert(
        'Error',
        'Something unexpected happened. Please try again later.'
      );
    }
  };

  const getJournalsMonthYear = async (year, month) => {
    const allJournals = await getAllValuesFromKey('journals');
    if (allJournals) {
      const journalsMonthYear = allJournals.filter((j) => {
        const jDate = new Date(j.date);
        return jDate.getFullYear() === year && jDate.getMonth() + 1 === month;
      });
      const journalsMonthYearObj = {};
      journalsMonthYear.forEach((j) => {
        const jDate = new Date(j.date);
        const dateStr = jDate.toISOString().split('T')[0];
        journalsMonthYearObj[dateStr] = {
          image: j.journalCover,
          entry: j.entry,
        };
      });
      // console.log(journalsMonthYearObj);
      setJournals(journalsMonthYearObj);
      // setLoading(false);
    }
  };

  const scroll = async (direction) => {
    if (direction === 'left') {
      // navigate to previous month
      if (month === 1) {
        setMonth(12);
        setMonthLong('December');
        setYear(year - 1);
        await getJournalsMonthYear(year - 1, 12);
      } else {
        setMonth(month - 1);
        setMonthLong(
          new Date(year, month - 2, 1).toLocaleString('default', {
            month: 'long',
          })
        );
        await getJournalsMonthYear(year, month - 1);
      }
    } else if (direction === 'right') {
      // navigate to next month
      if (month === 12) {
        setMonth(1);
        setMonthLong('January');
        setYear(year + 1);
        await getJournalsMonthYear(year + 1, 1);
      } else {
        setMonth(month + 1);
        setMonthLong(
          new Date(year, month, 1).toLocaleString('default', { month: 'long' })
        );
        await getJournalsMonthYear(year, month + 1);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllJournalsOfCurrentMonth();
    };

    fetchData();
  }, []); // empty dependency array ensures this effect only runs on mount

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <FontAwesome name='arrow-left' size={24} color='#fff' />
      </TouchableOpacity>

      <Text style={styles.header}>Your Journals</Text>
      <View style={styles.box}>
        <Text style={{ color: '#fff' }}>
          {monthLong}, {year}
        </Text>
        <JournalCalendar
          year={year}
          month={month}
          journalData={journals}
          navigation={navigation}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <PillButton
          text='<-'
          bgColor={'#fff'}
          textColor='#000'
          onPress={() => scroll('left')}
        />
        <PillButton
          text='->'
          bgColor={'#fff'}
          textColor='#000'
          onPress={() => scroll('right')}
        />
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
  backButton: {
    marginTop: 60,
    marginLeft: 20,
  },
  header: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    marginTop: 50,
  },
  box: {
    backgroundColor: '#101010',
    padding: 20,
    paddingBottom: '20%',
    borderRadius: 10,
    marginBottom: 10,
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
    marginBottom: 10,
  },
  calendarDate: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 18,
    color: '#fff',
    paddingTop: '40%',
  },
  calendarImage: {
    width: 40,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  calendarDateContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarPlaceholder: {
    width: 40,
    height: 60,
    backgroundColor: '#555',
    borderRadius: 10,
  },
});
