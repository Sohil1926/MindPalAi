import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Onboarding = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate({ name: 'Home' });
};

  return (
    <View className='bg-black'> 
    <View>
      <Text className = 'text-2xl font-semibold pr-24 pb-4 text-white	'>we’re only going to show this once. </Text>
      <Text className = 'text-xl font-normal pb-4 pr-24 text-white	' >think of this app like BeReal but for journalling.  </Text>
      <Text className = 'text-xl font-normal  pb-4 pr-24 text-white	' >its going to prompt you randomly 3 times a day to type how ur feeling in.   </Text>
      <Text className = 'text-xl font-normal  pb-4 pr-24 text-white	' >think of it like writing a tweet or smth   </Text>
      <Text className = 'text-xl font-normal  pr-24 text-white	' >you’ll have a assistant to help you write till you have explored your thoughts    </Text>
      <Text className = 'text-xl font-normal pb-4 pr-24 text-white	' >each time you submit you build your streak    </Text>
      <Text className = 'text-xl font-normal pb-4 pr-24 text-white	' >all the stuff you write is stored locally on your device.    </Text>
      <Button className = 'rounded-full' title="Get Started" onPress={() => navigation.navigate('Home')} /> 
    </View>
    </View>
  );
};


export default Onboarding;
