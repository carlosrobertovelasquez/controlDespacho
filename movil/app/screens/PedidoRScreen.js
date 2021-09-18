import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
import axios from 'react-native-axios';
import {ServerApi} from '@recursos/ServerApi';
var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

export default function PedidoRScreen(props, {navigation}) {
  const {ticket} = props.navigation.state.params;
  const {pedido} = props.navigation.state.params;
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [filterTicket, setFilterTicket] = useState([]);
  const [cantidadPreparada, setCantidadPreparada] = useState('0');
  const [cantiadPedida, setCantiadPedida] = useState('');
  const [searchCodigoBarra, setSearchCodigoBarra] = useState('');
  const [modalVisible, setModalVisible] = useState('false');
  const [pedidoLinea, setPedidoLinea] = useState('');
  useEffect(() => {
    let mounted = true;
    var url = ServerApi;
    var request = `/getRevisoTicketid/${ticket}?pedido=${pedido}`;
    const fecthTickets = async () => {
      await axios.get(url + request).then(resp => {
        if (mounted) {
          const datos = resp.data;
          setData(datos);
        }
      });
    };
    fecthTickets();
    return function cleanup() {
      mounted = false;
    };
  }, [data]);

  useEffect(() => {
    setFilterTicket(
      data.filter(ticketId => {
        let articulo = ticketId.articulo
          .toLowerCase()
          .includes(textSearch.toLowerCase());
        if (ticketId.codigoBarrasVent) {
          var barrasV = ticketId.codigoBarrasVent
            .toLowerCase()
            .includes(textSearch.toLowerCase());
        }
        if (ticketId.codigoBarrasInvt) {
          var barrasI = ticketId.codigoBarrasInvt
            .toLowerCase()
            .includes(textSearch.toLowerCase());
        }
        if (ticketId.manufacturador) {
          var barrasM = ticketId.manufacturador
            .toLowerCase()
            .includes(textSearch.toLowerCase());
        }
        if (
          ticketId.articuloDelProveedor &&
          ticketId.articulo !== ticketId.articuloDelProveedor
        ) {
          var barrasP = ticketId.articuloDelProveedor
            .toLowerCase()
            .includes(textSearch.toLowerCase());
        }

        return articulo || barrasV || barrasI || barrasM || barrasP;
      }),
    );
  }, [textSearch, data]);

  const guardar = (linea, pedido2, articulo, cantidad, valor) => {
    const cantPedida1 = parseFloat(cantidad);
    if (cantidadPreparada < cantPedida1) {
      irGuardar(linea, pedido2, articulo, cantidad, valor);
    } else {
      irGuardar(linea, pedido2, articulo, cantidad, valor);
    }
  };

  const irGuardar = async (linea, pedido2, articulo, cantidad, valor) => {
    //Actualizamos en la tabla preparados
    var url = ServerApi;
    var request = '/getUpdateReviso';
    await axios
      .post(url + request, {
        cantidad: valor,
        ticket: ticket,
        articulo: articulo,
        pedido: pedido2,
        linea: linea,
      })
      .then(resp => {
        const datos = resp;
        setModalVisible(false);
        setTextSearch('');
        setSearchCodigoBarra('');
        countRegiterData(ticket, pedido);
        setCantidadPreparada('0');
      });
  };

  const countRegiterData = async (ticket2, pedido2) => {
    const contador = data.length - 1;
    if (contador === 0) {
      var url = ServerApi;
      var request = '/getUpdateTicketReviso';
      await axios
        .post(url + request, {ticket: ticket2, pedido: pedido2})
        .then(resp => {
          Alert.alert('Aviso', 'Ticket Revisado Existosamente');
          props.navigation.navigate('ListaP');
        });
    }
  };

  const handleKeyPress = ({nativeEvent: {key: keyValue}}) => {
    console.log(keyValue);
  };
  const LeerCodigoBarra = text => {
    //const {text} = e.nativeEvent;
    const encontro = buscarBarra(text);
    for (let index = 0; index < encontro.length; index++) {
      const element = encontro[index];
      if (
        element.articulo === text ||
        element.codigoBarrasInvt === text ||
        element.codigoBarrasVent === text ||
        element.manufacturador === text ||
        element.articuloDelProveedor === text
      ) {
        const cantPedida1 = parseFloat(element.cantidad);
        const valor1 = parseFloat(cantidadPreparada) + 1;
        if (valor1 > cantPedida1) {
          Alert.alert('No se Puede Adicionar mas de lo Pedido');
        } else {
          const valor2 = valor1.toString();
          setCantidadPreparada(valor2);
          setSearchCodigoBarra('');
          if (element.cantidad === parseFloat(valor2)) {
            guardar(
              element.reviso_id,
              element.pedido,
              element.articulo,
              element.cantidad,
              valor2,
            );
          }
        }
      }
    }
  };

  const buscarBarra = text => {
    const result = data.filter(
      ticket =>
        ticket.articulo === text ||
        ticket.codigoBarrasInvt === text ||
        ticket.manufacturador === text ||
        ticket.articuloDelProveedor === text ||
        ticket.codigoBarrasVent === text,
    );
    return result;
  };
  const LeerArticulo = text => {
    const encontro = buscarBarra(text);
    if (encontro.length > 0) {
      setModalVisible(true);
    }
  };
  useEffect(() => {
    LeerCodigoBarra(searchCodigoBarra);
  }, [searchCodigoBarra]);
  useEffect(() => {
    LeerArticulo(textSearch);
  }, [textSearch]);

  return (
    <ScrollView>
      <View>
        <Text style={{fontSize: 35}}>Ticket {ticket} </Text>
        <Text style={{fontSize: 35}}>Buscar Articulo: </Text>

        <TextInput
          style={styles.buscar}
          onChangeText={text => setTextSearch(text)}
          value={textSearch}
          placeholder="Digite Codigo Articulo ...."
          onKeyPress={handleKeyPress}
          autoFocus={true}></TextInput>

        <View>
          <FlatList
            data={filterTicket}
            horizontal={true}
            renderItem={item => (
              <View style={styles.flatListMain}>
                <View style={styles.flatListHeader}>
                  <View style={styles.columna1}>
                    <Text style={{fontWeight: 'bold', color: '#34CE73'}}>
                      Pedido :
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>{item.item.pedido}</Text>
                    <Text>Código:</Text>
                    <Text>{item.item.articulo}</Text>
                    <Text>Descripción:</Text>
                    <Text>{item.item.descripcion}</Text>
                  </View>
                  <View style={styles.columna2}>
                    <Text style={{fontWeight: 'bold', color: '#34CE73'}}>
                      Linea:
                    </Text>
                    <Text>{item.item.pedidoLinea}</Text>
                    <Text>Código Barras:</Text>
                    <Text>{item.item.codigoBarrasVent}</Text>
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
                    <Text style={styles.cantidad}> {item.item.cantidad}</Text>
                  </View>
                  <View style={{alignItems: 'center', alignContent: 'center'}}>
                    <Text>Contadas</Text>
                    <Text style={[styles.cantidad, {color: '#FF0000'}]}>
                      {cantidadPreparada}
                    </Text>
                  </View>
                </View>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}>
                  <View style={styles.modal}>
                    <View style={styles.modalContent}>
                      <Text
                        style={{
                          color: 'blue',
                          padding: 10,
                          fontWeight: 'bold',
                        }}>
                        ADICIONAR ARTICULOS
                      </Text>
                      <Text style={{fontWeight: 'bold'}}>
                        PEDIDO: {item.item.pedido}
                      </Text>
                      <View style={styles.header}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 10,
                          }}>
                          <View>
                            <Text>
                              Barras Vent:{item.item.codigoBarrasVent}
                            </Text>
                            <Text>Codigo Articulo :{item.item.articulo}</Text>
                          </View>
                          <View>
                            <Text>Barras Inv:{item.item.codigoBarrasInvt}</Text>
                          </View>
                        </View>
                        <View>
                          <Text style={{width: 280}}>
                            Des.:{item.item.descripcion}
                          </Text>
                        </View>
                        <TextInput
                          style={styles.inputSearch}
                          onChangeText={value => setSearchCodigoBarra(value)}
                          value={searchCodigoBarra}
                          placeholder="Leer Codigo Barra ......................."
                          autoFocus={true}></TextInput>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          margin: 10,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            alignContent: 'center',
                          }}>
                          <Text>Pedidas</Text>
                          <Text style={styles.text}> {item.item.cantidad}</Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            alignContent: 'center',
                          }}>
                          <Text>Contadas</Text>
                          <Text style={[styles.text, {color: '#FF0000'}]}>
                            {cantidadPreparada}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          margin: 10,
                        }}>
                        <View style={{padding: 10}}>
                          <Button
                            title="Cerrar"
                            onPress={() => setModalVisible(false)}
                          />
                        </View>
                        <View style={{padding: 10}}>
                          <Button
                            color="#27CC6A"
                            onPress={() =>
                              guardar(
                                item.item.articulo,
                                item.item.cantidad,
                                cantidadPreparada,
                              )
                            }
                            title="Guardar"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flatListMain: {
    flex: 1,
    flexDirection: 'column',
    width: ancho,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  flatListHeader: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: ancho,
    padding: 10,
  },
  columna1: {
    width: '60%',
  },
  columna2: {
    width: '40%',
  },
  cantidad: {
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
  },
  buscar: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    margin: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSearch: {
    marginTop: 10,
    height: 75,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    fontWeight: 'bold',
    width: 300,
    color: 'blue',
    fontSize: 35,
  },
  text: {
    marginTop: 20,
    height: 50,
    width: 150,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 40,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0CCDA',
  },
});
