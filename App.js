import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WriteJournal from './pages/WriteJournal';
import JournalArchive from './pages/JournalArchive';
import JournalEntry from './pages/JournalEntry';
import Onboarding from './pages/Onboarding';
import Name from './pages/Name';
import VerifyCode from './pages/VerifyCode';
import EnterPhoneNumber from './pages/EnterPhoneNum';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Name' component={Name} />
        <Stack.Screen name='PhoneNumber' component={EnterPhoneNumber} />
        <Stack.Screen name='VerifyCode' component={VerifyCode} />

        <Stack.Screen name='Onboarding' component={Onboarding} />
        <Stack.Screen name='Home' component={Homepage} />
        <Stack.Screen name='JournalArchive' component={JournalArchive} />
        <Stack.Screen name='JournalEntry' component={JournalEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
