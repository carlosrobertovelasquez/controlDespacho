import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Button,
  Touchable,
  Alert,
  StyleSheet,
} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
import MyButton from '@components/MyButton';
import color from '@styles/colors';
import useAuth from '@hooks/useAuth';
import axios from 'react-native-axios';
import {ServerApi} from '@recursos/ServerApi';
import AsyncStorage from '@react-native-community/async-storage';
import {setToken, getToken} from '@recursos/token';
const PrincipalScreen = ({navigation}) => {
  const {auth, logout, setAuth} = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    var url = ServerApi;
    var request = `/getTicketsPreparador/${auth.idPreparador}`;
    const fecthTickets = async () => {
      await axios.get(url + request).then(resp => {
        const datos = resp.data;
        setData(datos);
      });
    };
    fecthTickets();
    return () => ac.abort();
  }, [data]);

  const estado01 = data.filter(function (ticket) {
    return ticket.estado === '01';
  });
  const estado02 = data.filter(function (ticket) {
    return ticket.estado === '02';
  });
  const estado03 = data.filter(function (ticket) {
    return ticket.estado === '03';
  });
  const ticketAsignados = () => {
    goToScreen('Ticket');
  };
  function goToScreen(routeName) {
    navigation.replace(routeName);
  }
  const borrarStorage = async token => {
    try {
      await AsyncStorage.removeItem('token');
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[loginStyles.container, {padding: 50}]}>
      <StatusBar backgroundColor={color.BLUE} translucent={true} />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 25,
          fontFamily: 'Poppins-Bold',
        }}>
        Control Despacho{'\n' + auth.name}
      </Text>
      {estado01.length > 0 ? (
        <TouchableOpacity activeOpacity={0.8} style={mainStyles.btnMainVerde}>
          <Text style={mainStyles.btntxt}>
            Ticket Asignado : {estado01.length}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.8} style={mainStyles.btnMainVerde}>
          <Text style={mainStyles.btntxt}>Ticket Asignado:0</Text>
        </TouchableOpacity>
      )}
      {estado02.length > 0 ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={mainStyles.btnMainAmarillo}>
          <Text style={mainStyles.btntxt}>
            Ticket Preparando : {estado02.length}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={mainStyles.btnMainAmarillo}>
          <Text style={mainStyles.btntxt}>Ticket Preparando : 0</Text>
        </TouchableOpacity>
      )}
      {estado03.length > 0 ? (
        <TouchableOpacity activeOpacity={0.8} style={mainStyles.btnMainRojo}>
          <Text style={mainStyles.btntxt}>
            Ticket a Revisi??n : {estado03.length}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.8} style={mainStyles.btnMainRojo}>
          <Text style={mainStyles.btntxt}>Ticket a Revisi??n : 0</Text>
        </TouchableOpacity>
      )}

      <MyButton titulo="Ir a Preparar" onPress={() => ticketAsignados()} />
      <View style={styles.fixToText}>
        <Button title="Cerrar Sessi??n" onPress={() => borrarStorage()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#b22222',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default PrincipalScreen;
