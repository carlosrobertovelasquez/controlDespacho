import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
import color from '@styles/colors';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
import useAuth from '@hooks/useAuth';
import CardTicketP from '@components/CardTicketP';
const TicketPScreen = ({navigation}) => {
  const {auth} = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    var url = ServerApi;
    var request = `/listaTicketPreparador/${auth.idPreparador}`;
    const fecthTickets = async () => {
      await axios.post(url + request, {estado: '02'}).then(resp => {
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
        Tickets A Preparar
      </Text>

      <FlatList
        data={data}
        renderItem={data => <CardTicketP data={data} navigation={navigation} />}
        keyExtractor={data.id}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

export default TicketPScreen;
