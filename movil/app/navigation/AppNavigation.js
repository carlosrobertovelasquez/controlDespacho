import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen';
import PrincipalScreen from '@screens/PrincipalScreen';
import TicketScreen from '@screens/TicketScreen';
import PedidoScreen from '@screens/PedidoScreen';
import PedidoRScreen from '@screens/PedidoRScreen';
import CardTicketScreen from '@components/CardTicket';
import TicketRScreen from '@screens/TicketRScreen';

import {Button} from 'react-native';
const AppNavigation = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Principal: {
    screen: PrincipalScreen,
    navigationOptions: {
      headerShown: false,
      headerRight: () => {
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#00cc00"
        />;
      },
    },
  },
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TicketR: {
    screen: TicketRScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CardTicket: {
    screen: CardTicketScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Pedido: {
    screen: PedidoScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  PedidoR: {
    screen: PedidoRScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
});

export default createAppContainer(AppNavigation);
