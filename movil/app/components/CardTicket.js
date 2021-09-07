import React from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import {loginStyles} from '@styles/styles';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
//import useTimeAgo from '@hooks/useTimeAgo';
import moment from 'moment';
const CardTicket = props => {
  moment.locale('es');
  const {navigation} = props;
  const {data} = props;
  const fecha = moment(data.item.fecha_inicio).format('DD-MM-YYYY');
  const Hora = moment(data.item.fecha_inicio).format('hh:mm');
  const fechaInicio = data.item.fecha_inicio;
  const fecha2 = Date.parse(data.item.fecha_inicio);
  const diff = moment(fechaInicio || moment.now()).fromNow();

  const irTicket = ticket => {
    Alert.alert(`Ticket ${ticket}`, 'Ir a Preparar', [
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
    var request = `/getInsertPreparo/${ticket}`;
    await axios.get(url + request).then(resp => {
      const datos = resp.success;
      actualizarEstado(ticket);
      navigation.navigate('Pedido', ticket);
    });
  };
  const actualizarEstado = async ticket => {
    var url = ServerApi;
    var request = `/ticketEstado/${ticket}`;
    await axios.put(url + request, {estado: '02'}).then(resp => {});
  };
  return (
    <>
      <Card
        containerStyle={[loginStyles.container, {backgroundColor: '#FF0000'}]}>
        <TouchableOpacity onPress={() => irTicket(data.item.ticket)}>
          <Card.Title containerStyle={{backgroundColor: '#000000'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'Poppins-Bold',
                color: '#fff',
              }}>
              Ticke{data.item.ticket}
            </Text>
          </Card.Title>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text style={{color: '#fff'}}>Fecha : {fecha}</Text>
            <Text style={{color: '#fff'}}> Hora : {Hora}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text style={{color: '#fff'}}>
              Pedidos : {data.item.cant_pedido}
            </Text>
            <Text style={{color: '#fff'}}> Tiempo : {diff}</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </>
  );
};

export default CardTicket;
