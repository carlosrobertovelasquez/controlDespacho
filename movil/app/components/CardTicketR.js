import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
import moment from 'moment';
const CardTicketR = ({data, navigation}) => {
  const fecha = moment(data.fecha_inicio).format('DD-MM-YYYY');
  const Hora = moment(data.fecha_inicio).format('hh:mm');
  const fechaInicio = data.fecha_inicio;
  const fecha2 = Date.parse(data.fecha_inicio);
  const diff = moment(fechaInicio || moment.now()).fromNow();

  const irTicket = ticket => {
    Alert.alert(`Ticket ${ticket}`, 'Ir a Revisión', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'SI', onPress: () => irPararar(ticket)},
    ]);
  };
  const irPararar = async ticket => {
    //Creamos la solicitud de preparacion

    var url = ServerApi;
    var request = `/getInsertReviso/${ticket}`;
    await axios.get(url + request).then(resp => {
      const datos = resp.success;

      navigation.navigate('ListaP', ticket);
    });
  };
  return (
    <>
      <TouchableOpacity onPress={() => irTicket(data.item.ticket)}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Ticket: {data.item.ticket}</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#ffffff', alignContent: 'center'}}>
              Fecha : {fecha}
            </Text>
            <Text style={{color: '#ffffff', alignContent: 'center'}}>
              {' '}
              Hora : {Hora}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Text style={{color: '#ffffff', alignContent: 'center'}}>
              Pedidos : {data.item.cant_pedido}
            </Text>
            <Text style={{color: '#ffffff', alignContent: 'center'}}>
              {' '}
              Tiempo : {diff}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#DC3545',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});

export default CardTicketR;
