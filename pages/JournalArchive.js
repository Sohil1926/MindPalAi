import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
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

  const [journalKeys, setJournalKeys] = useState([]);

  const getAllJournals = async () => {
    try {
      const allJournalKeys = await getAllValuesFromKey('journals');
      if (allJournalKeys !== null) {
        const keys = allJournalKeys?.map((j) => j.date);
        // sort keys from newest to oldest
        keys.sort((a, b) => new Date(b) - new Date(a));
        setJournalKeys(keys);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something unexpected happened. Please try again later.'
      );
    }
  };

  useEffect(() => {
    // delete all journals
    // AsyncStorage.removeItem('journals');
    getAllJournals();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
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
    paddingTop: '40%',
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 10,
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
});
