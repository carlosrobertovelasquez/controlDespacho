import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
import axios from 'react-native-axios';
import {ServerApi} from '@recursos/ServerApi';
import {List} from 'react-native-paper';
import {ThemeContext} from 'react-native-elements';
import {parse} from '@babel/core';

export default function PedidoRScreen(props, {navigation}) {
  const {params} = props.navigation.state;
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [filterTicket, setFilterTicket] = useState([]);
  const [cantidadPreparada, setCantidadPreparada] = useState('0');
  const [cantiadPedida, setCantiadPedida] = useState('');
  useEffect(() => {
    const ac = new AbortController();
    var url = ServerApi;
    var request = `/getRevisoTicketid/${params}`;
    const fecthTickets = async () => {
      await axios.get(url + request).then(resp => {
        const datos = resp.data;
        setData(datos);
      });
    };
    fecthTickets();
    return () => ac.abort();
  }, [data]);
  useEffect(() => {
    setFilterTicket(
      data.filter(ticket => {
        return ticket.articulo.toLowerCase().includes(textSearch.toLowerCase());
      }),
    );
  }, [textSearch, data]);

  const guardar = (cantidad, articulo, pedido, pedidoLinea) => {
    const cantPedida1 = parseFloat(cantidad);
    if (cantidadPreparada < cantPedida1) {
      Alert.alert('Guardar', 'Quiere proceder a Guardar', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'SI', onPress: () => irGuardar(articulo, pedido, pedidoLinea)},
      ]);
    } else {
      irGuardar(articulo, pedido, pedidoLinea);
    }
  };

  const irGuardar = async (articulo, pedido, linea) => {
    //Actualizamos en la tabla preparados
    var url = ServerApi;
    var request = '/getUpdateReviso';

    await axios
      .post(url + request, {
        cantidad: cantidadPreparada,
        ticket: params,
        articulo: articulo,
        pedido: pedido,
        linea: linea,
      })
      .then(resp => {
        const datos = resp;
        setTextSearch('');
        setCantidadPreparada('0');
      });
  };
  const cancelar = (articulo, cantPedida) => {
    const cantPedida1 = parseFloat(cantPedida);
    const valor1 = parseFloat(cantidadPreparada) + 1;
    if (articulo === textSearch) {
      if (valor1 > cantPedida1) {
        Alert.alert('No se Puede Adicionar mas de lo Pedido');
      } else {
        const valor2 = valor1.toString();
        setCantidadPreparada(valor2);
      }
    } else {
      Alert.alert('Digite El Articulo en la Busqueda');
    }
  };

  const handleKeyPress = ({nativeEvent: {key: keyValue}}) => {
    console.log(keyValue);
  };

  return (
    <ScrollView>
      <View style={[loginStyles.container, {marginTop: 20, padding: 20}]}>
        <Text style={{fontSize: 35}}>Ticket :{params} </Text>
        <Text style={{fontSize: 35}}>Buscar Articulo: </Text>

        <TextInput
          style={{
            marginTop: 10,
            height: 50,
            borderColor: '#e1e1e1',
            borderWidth: 1,
            borderStyle: 'solid',
          }}
          onChangeText={text => setTextSearch(text)}
          value={textSearch}
          placeholder="Digite Codigo Articulo ...."
          onKeyPress={handleKeyPress}
          autoFocus={true}></TextInput>

        <View style={{height: 450}}>
          <FlatList
            data={filterTicket}
            horizontal={true}
            renderItem={item => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  width: 350,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'grey',
                  margin: 4,
                }}>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold', color: '#34CE73'}}>
                      Pedido :
                    </Text>
                    <Text>{item.item.pedido}</Text>

                    <Text>Código:</Text>
                    <Text>{item.item.articulo}</Text>
                    <Text>Descripción:</Text>
                    <Text style={{width: 280}}>{item.item.descripcion}</Text>
                  </View>
                  <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold', color: '#34CE73'}}>
                      Linea:
                    </Text>
                    <Text>{item.item.pedidoLinea}</Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 3,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <View style={{alignItems: 'center', alignContent: 'center'}}>
                    <Text>Pedidas</Text>
                    <Text
                      style={{
                        marginTop: 10,
                        height: 50,
                        width: 150,
                        borderColor: '#e1e1e1',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        alignItems: 'center',
                        alignContent: 'center',
                        fontSize: 35,
                        textAlign: 'center',
                        backgroundColor: '#C0CCDA',
                      }}>
                      {' '}
                      {item.item.cantidad}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', alignContent: 'center'}}>
                    <Text>Contadas</Text>
                    <TextInput
                      style={{
                        marginTop: 10,
                        height: 50,
                        width: 150,
                        borderColor: '#e1e1e1',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        alignItems: 'center',
                        alignContent: 'center',
                        fontSize: 30,
                        textAlign: 'center',
                        backgroundColor: '#C0CCDA',
                        color: '#FF0000',
                      }}
                      keyboardType="numeric"
                      editable={false}
                      value={cantidadPreparada}
                      onChange={text => setCantidadPreparada(text)}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <View>
                    <Button
                      color="#FD7850"
                      onPress={() =>
                        cancelar(item.item.articulo, item.item.cantidad)
                      }
                      title="Agregar"
                    />
                  </View>
                  <View>
                    <Button
                      color="#27CC6A"
                      onPress={() =>
                        guardar(
                          item.item.cantidad,
                          item.item.articulo,
                          item.item.pedido,
                          item.item.pedidoLinea,
                        )
                      }
                      title="Guardar"
                    />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
