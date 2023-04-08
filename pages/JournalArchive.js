import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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

// import { createCompletion } from './openAI';
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
        keys.sort((a, b) => {
          return new Date(b) - new Date(a);
        });
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
    getAllJournals();
  });

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: 'black',
      }}
    >
      {journalKeys.length === 0 && (
        <Text style={{ color: 'white', fontFamily: 'Manrope_400Regular' }}>
          You don't have any journals
        </Text>
      )}
      <FlatList
        data={journalKeys}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('JournalEntry', { key: item })}
            style={{
              borderWidth: 2,
              borderColor: 'white',
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Manrope_800ExtraBold',
  },
});
