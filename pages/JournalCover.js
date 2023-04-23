import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Image } from 'react-native';
import { Button } from '@rneui/base';
import axios from 'axios';
import qs from 'qs';
import PillButton from '../components/PillButton';
import JournalArchive from './JournalArchive';

const JournalCover = ({ navigation, setShowOnboarding, route }) => {
  const [journalEntry, setJournalEntry] = useState(route.params.journalEntry || '');
  const [imageUrl, setImageUrl] = useState(null);
  const goToTimeSelect = () => {
    navigation.navigate('TimeSelect');
  }

  useEffect(() => {
    // Load image URL when component mounts
    setImageUrl('https://example.com/image.jpg');
  }, []);
  // useEffect(() => {
  //   if (journalEntry !== '') {
  //     generateImage();
  //   }
  // }, [journalEntry]);

  // const generateImage = async () => {
  //   setImageUrl('loading');

  //   let data = qs.stringify({
  //     input: `This is my journal entry: "${journalEntry}"
  //       I want an image that represents my mood.`,
  //   });

  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://openaibackend-nt11.onrender.com/dalle',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       setImageUrl(response.data.response);
  //     })
  //     .catch((error) => {
  //       Alert.alert('Error', String(error));
  //       console.error(error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>MindPal.</Text>
        <Text style={styles.subHeading}>say hello to your journal cover</Text>
        {imageUrl !== null && (
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80' }}
            style={{ width: 319, height: 403, resizeMode: 'cover', borderRadius: 10, borderWidth: 2, borderColor: '#FFF'}}
          />
        )}
      </View>
      <View style={styles.bottomSection}>
        <PillButton
          text="continue"
          onPress={goToTimeSelect}
          bgColor={'#ffffff'}
          textColor={'#000000'}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    fontSize: 35,
    fontFamily: 'Manrope_800ExtraBold',
    color: 'white',
    backgroundColor: '#020202',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 5,
    width: '100%',
  },
  bottomSection: {
    marginBottom: 50,
  },
  button: {
    fontFamily: 'Manrope_600SemiBold',
  },
});

export default JournalCover;
