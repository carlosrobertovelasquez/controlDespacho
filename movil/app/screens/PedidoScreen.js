import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
import axios from 'react-native-axios';
import {ServerApi} from '@recursos/ServerApi';
import {List} from 'react-native-paper';
import {ThemeContext} from 'react-native-elements';

export default function PedidoScreen(props, {navigation}) {
  const {params} = props.navigation.state;
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [filterTicket, setFilterTicket] = useState([]);
  const [cantidadPreparada, setCantidadPreparada] = useState('0');
  useEffect(() => {
    var url = ServerApi;
    var request = `/getPreparoTicketid/${params}`;
    const fecthTickets = async () => {
      await axios.get(url + request).then(resp => {
        const datos = resp.data;
        setData(datos);
      });
    };
    fecthTickets();
  }, [data]);

  useEffect(() => {
    setFilterTicket(
      data.filter(ticket => {
        return ticket.ARTICULO.toLowerCase().includes(textSearch.toLowerCase());
      }),
    );
  }, [textSearch, data]);

  const regresar = () => {
    //console.log('Hola');
    navigation.navigate('Ticket');
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
          autoFocus={true}
          onKeyPress={handleKeyPress}></TextInput>

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
                    <Text>{item.item.PEDIDO}</Text>

                    <Text>Código:</Text>
                    <Text>{item.item.ARTICULO}</Text>
                    <Text>Descripción:</Text>
                    <Text style={{width: 280}}>{item.item.DESCRIPCION}</Text>
                  </View>
                  <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold', color: '#34CE73'}}>
                      Linea
                    </Text>
                    <Text>{item.item.PEDIDO_LINEA}</Text>
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
                      {item.item.CANTIDAD}
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
                      }}
                      keyboardType="numeric"
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
                    <Button color="#FD7850" title="Cancelar" />
                  </View>
                  <View>
                    <Button color="#27CC6A" title="Guardar" />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <Button title="Regresar" onPress={() => regresar()} />
      </View>
    </ScrollView>
  );
}
