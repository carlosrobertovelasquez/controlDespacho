import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Card, ListItem, Icon, Button} from 'react-native-elements';
import {loginStyles, mainStyles} from '@styles/styles';
import moment from 'moment';
const CardTicket = (props, {navigation}) => {
  moment.locale('es');
  const {data} = props;
  const fecha = moment(data.fecha_inicio).format('DD-MM-YYYY');
  const Hora = moment(data.fecha_inicio).format('hh:mm');
  const hoy = new Date().getDate();
  const hoy2 = moment(hoy);
  const fechaInicio = data.fecha_inicio;
  const diff = moment(fechaInicio || moment.now()).fromNow();

  //var s = d.format('hh:mm:ss');
  const irTicket = ticket => {
    navigation.navigate('Pedido', ticket);
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={data => (
          <Card
            containerStyle={[
              loginStyles.container,
              {backgroundColor: '#C0CCDA'},
            ]}>
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
                <Text>Fecha :{fecha}</Text>
                <Text>Hora :{Hora}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text>Pedidos:{data.item.cant_pedido}</Text>
                <Text>Tiempo:{diff}</Text>
              </View>
            </TouchableOpacity>
          </Card>
        )}
        keyExtractor={data.id}
      />
    </>
  );
};

export default CardTicket;

/**
 * <>
      <FlatList
        data={data}
        renderItem={data => (
          <Card containerStyle={[loginStyles.container]}>
            <Card.Title>Ticke{data.item.ticket}</Card.Title>
            <Card.Divider />
            <View style={{backgroundColor: '#C0CCDA'}}>
              <Text>Fecha :{data.item.fecha_inicio}</Text>
              <Text>Pedidos:{data.item.cant_pedido}</Text>
              <Text>Tiempo:{data.item.fecha_inicio}</Text>
            </View>
          </Card>
        )}
        keyExtractor={data.id}
      />
    </>
 * 
 * 
 */
