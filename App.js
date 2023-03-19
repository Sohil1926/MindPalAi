import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './Homepage';
import JournalArchive from './JournalArchive';
import JournalEntry from './JournalEntry';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={Homepage}
        />
        <Stack.Screen name="JournalArchive" component={JournalArchive} />   
        <Stack.Screen name="JournalEntry" component={JournalEntry} />   

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;