import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Notifications } from 'expo-notifications';

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
import { getObjFromKey, setFieldToKey } from '../utils/asyncStorageUtils';
import JournalArchive from './JournalArchive';

const TimeSelect = ({ navigation, setShowOnboarding }) => {
    const [fontsLoaded] = useFonts({
        Manrope_800ExtraBold,
        Manrope_400Regular,
        Manrope_200ExtraLight,
        Manrope_300Light,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
      });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
  
    const handleDateChange = (event, date) => {
      if (date !== undefined) {
        setSelectedDate(date);
        setShowPicker(false); // Add this line to close the date picker after selecting a new time
      }
    };
    const scheduleNotification = async () => {
        try {
          // Define the notification content
          const notificationContent = {
            title: "MindPal",
            body: "Time to journal!",
          };
          
          // Calculate the time for the next day's notification
          const nextDay = selectedDate.getDate() + 1;
          const notificationTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), nextDay, selectedDate.getHours(), selectedDate.getMinutes());
      
          // Schedule the notification
          const schedulingOptions = {
            content: notificationContent,
            trigger: { date: notificationTime },
          };
          await Notifications.scheduleNotificationAsync(schedulingOptions);
        } catch (error) {
          console.log('Error scheduling notification', error);
        }
      };
      
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.heading}>MindPal.</Text>
          <Text style={styles.subHeading}>
            Select one time every day that you can journal for 10 minutes. You won’t be able to change this so pick a time that works everyday.
          </Text>
        </View>
  
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.touchable}>
          <TextInput
            style={styles.input}
            value={selectedDate.toLocaleTimeString()}
            editable={false}
          />
        </TouchableOpacity>
  
  
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode='time'
            display='default'
            onChange={handleDateChange}
            style={{backgroundColor: 'black'}}

          />
        )}
  
        <View style={styles.bottomSection}>
          <PillButton
            text='continue'
            onPress={() => {
                scheduleNotification();
                navigation.navigate('FindFriends');
            }}            
              bgColor={'#ffffff'}
          />
        </View>
      </View>
    );
  };
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20, // add this to push the content down
    paddingHorizontal: 20, // add this for some horizontal padding
    alignItems: 'center',
justifyContent: 'center'
  },
  selectedTime: {
    
  },
  selectedTimeContainer: {
  },
  topSection: {
    flex: 1, // add this to take up remaining space
    justifyContent: 'flex-start', // add this to align content to top
    alignItems: 'center', // center horizontally
  },
  heading: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    paddingBottom: 20,
    color: 'white',
    fontFamily: 'Manrope_600SemiBold',
    textAlign: 'center',
  },
  input: {
    fontSize: 45,
    fontFamily: 'Manrope_800ExtraBold',
    color: 'white',
    backgroundColor: '#020202',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -50,
    width: '100%',
  },
  touchable: { 
    height: 60,

  },
  bottomSection: {
    marginBottom: 50, // add this to create space for the button
    marginTop: '50%',
    width: 300,
  },
  button: {
    fontFamily: 'Manrope_600SemiBold',
    backgroundColor: 'white',

  },
});

export default TimeSelect;
