// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import AccountScreen from './screens/Account';
import { MenuProvider } from 'react-native-popup-menu';
import OperationFormScreen from './screens/OperationForm';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Operation form" component={OperationFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#1d3557',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
