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
import TicketPScreen from '@screens/TicketPScreen';
import ParemScreen from '@screens/ParaScreen';
import ListaPedido from '@screens/ListaPedido';
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
  Param: {
    screen: ParemScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Principal: {
    screen: PrincipalScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  TicketR: {
    screen: TicketRScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  TicketP: {
    screen: TicketPScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  CardTicket: {
    screen: CardTicketScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ListaP: {
    screen: ListaPedido,
    navigationOptions: {
      headerShown: true,
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
