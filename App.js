import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Homepage from './pages/Homepage';
import JournalArchive from './pages/JournalArchive';
import JournalEntry from './pages/JournalEntry';
import Onboarding from './pages/Onboarding';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Manrope: require('./assets/fonts/Manrope.ttf'),
  });
  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Homepage} />
        <Stack.Screen name='Onboarding' component={Onboarding} />
        <Stack.Screen name='JournalArchive' component={JournalArchive} />
        <Stack.Screen name='JournalEntry' component={JournalEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
