import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
import axios from 'react-native-axios';
import {ServerApi} from '@recursos/ServerApi';
import {List} from 'react-native-paper';
import {ThemeContext} from 'react-native-elements';
import Registro from '@components/Registro';

export default function PedidoScreen(props, {navigation}) {
  const {params} = props.navigation.state;
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [filterTicket, setFilterTicket] = useState([]);
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

  const regresar = () => {
    navigation.navigate('Principal');
  };

  return (
    <View
      style={[loginStyles.container, {marginTop: 20, padding: 20, flex: 1}]}>
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
        placeholder="Digite Codigo Articulo ...."></TextInput>

      <Registro />

      <Button title="Regresar" onPress={() => regresar()} />
    </View>
  );
}
