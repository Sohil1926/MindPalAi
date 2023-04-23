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
import JournalCover from './pages/JournalCover';
import TimeSelect from './pages/TimeSelect';
import FindFriends from './pages/FindFriends';
import Homepage from './pages/Homepage';
import { Notifications } from 'expo';
import { registerForPushNotificationsAsync } from 'expo-notifications';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  // React.useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  // async function registerForPushNotificationsAsync() {
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     console.log('Failed to get push token for push notification!');
  //     return;
  //   }
  //   console.log('Got push token for push notification:', token);
  // }
  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Onboarding' component={Onboarding} />
        <Stack.Screen name='Name' component={Name} />
        <Stack.Screen name='PhoneNumber' component={EnterPhoneNumber} />
        <Stack.Screen
          name='VerifyCode'
          component={VerifyCode}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name='TimeSelect' component={TimeSelect} />
        <Stack.Screen name='WriteJournal' component={WriteJournal} />
        <Stack.Screen name='JournalCover' component={JournalCover} />
        <Stack.Screen name='FindFriends' component={FindFriends} />
        <Stack.Screen name='Homepage' component={Homepage} />

        <Stack.Screen name='JournalArchive' component={JournalArchive} />
        <Stack.Screen name='JournalEntry' component={JournalEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
