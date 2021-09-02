import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {loginStyles} from '@styles/styles';
import moment from 'moment';
const CardTicket = props => {
  moment.locale('es');
  const {navigation} = props;
  const {data} = props;
  const fecha = moment(data.item.fecha_inicio).format('DD-MM-YYYY');
  const Hora = moment(data.item.fecha_inicio).format('hh:mm');
  const fechaInicio = data.item.fecha_inicio;
  const diff = moment(fechaInicio || moment.now()).fromNow();

  const irTicket = ticket => {
    navigation.navigate('Pedido', ticket);
  };

  return (
    <>
      <Card
        containerStyle={[loginStyles.container, {backgroundColor: '#C0CCDA'}]}>
        <TouchableOpacity onPress={() => irTicket(data.item.ticket)}>
          <Card.Title containerStyle={{backgroundColor: '#000000'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'Poppins-Bold',
              }}>
              Ticke{data.item.ticket}
            </Text>
          </Card.Title>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text>Fecha : {fecha}</Text>
            <Text> Hora : {Hora}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text>Pedidos : {data.item.cant_pedido}</Text>
            <Text> Tiempo : {diff}</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </>
  );
};

export default CardTicket;
