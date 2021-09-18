import React, {useState, useEffect} from 'react';
import axios from 'react-native-axios';
import {ServerApi} from '@recursos/ServerApi';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

export default function ListaPedido(props, {navigation}) {
  const {params} = props.navigation.state;
  const [data, setData] = useState(undefined);

  const irPedidoR = (pedido, ticket) => {
    const list = {pedido: pedido, ticket: ticket};
    props.navigation.navigate('PedidoR', list);
  };
  useEffect(() => {
    let mounted = true;
    var url = ServerApi;
    var request = `/ticketPedidos/${params}`;
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
  if (data === undefined) return null;
  if (data.length === 0) {
    props.navigation.navigate('TicketR');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Ticket:{params}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => irPedidoR(item.item.pedido, item.item.id_ticket)}>
            <View style={styles.item}>
              <Text style={styles.title}>Pedido:{item.item.pedido}</Text>
              <Text style={styles.detalle}>
                Cliente:{item.cliente}-{item.item.nombre}
              </Text>
              <Text style={styles.detalle}>
                Direccion:{item.item.direccion}
              </Text>
              <Text style={styles.detalle}>
                Vendedor:{item.item.nombre_vendedor}
              </Text>
              <Text style={styles.detalle}>Monto:{item.item.monto}</Text>
              <Text style={styles.detalle}>Nota:{item.item.nota}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#ffcc80',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  detalle: {
    fontSize: 12,
  },
});
