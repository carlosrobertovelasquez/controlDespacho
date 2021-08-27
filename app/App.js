import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './view/Login';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Iniciar Sesión',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
