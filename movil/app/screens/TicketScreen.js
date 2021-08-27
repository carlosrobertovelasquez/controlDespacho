import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, ListItem, Icon} from 'react-native-elements';
import {loginStyles, mainStyles} from '@styles/styles';
import color from '@styles/colors';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
import useAuth from '@hooks/useAuth';
import moment from 'moment';

const TicketScreen = ({navigation}) => {
  const {auth} = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    var url = ServerApi;
    var request = `/listaTicketPreparador/${auth.idPreparador}`;
    const fecthTickets = async () => {
      await axios.get(url + request, {estado: '01'}).then(resp => {
        const datos = resp.data;
        setData(datos);
      });
    };
    fecthTickets();
  }, [data]);

  const fecha = moment(data.fecha_inicio).format('DD-MM-YYYY');
  const Hora = moment(data.fecha_inicio).format('hh:mm');
  const hoy = new Date().getDate();
  const hoy2 = moment(hoy);
  const fechaInicio = data.fecha_inicio;
  const diff = moment(fechaInicio || moment.now()).fromNow();

  const regresar = () => {
    navigation.navigate('Principal');
  };
  const irTicket = ticket => {
    navigation.navigate('Pedido', ticket);
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
        Tickets Asignados
      </Text>
      <Button title="Regresar" onPress={() => regresar()} />
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
    </View>
  );
};

export default TicketScreen;
