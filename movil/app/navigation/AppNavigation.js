import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen';
import PrincipalScreen from '@screens/PrincipalScreen';
import TicketScreen from '@screens/TicketScreen';
import PedidoScreen from '@screens/PedidoScreen';
import CardTicketScreen from '@components/CardTicket';
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
    },
  },
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Pedido: {
    screen: PedidoScreen,
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
});

export default createAppContainer(AppNavigation);
