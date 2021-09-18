import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
import color from '@styles/colors';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
import useAuth from '@hooks/useAuth';
import CardTicketR from '@components/CardTicketR';
const TicketRScreen = ({navigation}) => {
  const {auth} = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    var url = ServerApi;
    var request = `/listaTicketPreparador/${auth.idPreparador}`;
    const fecthTickets = async () => {
      await axios.post(url + request, {estado: '03'}).then(resp => {
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
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 2,
          fontSize: 25,
          fontFamily: 'Poppins-Bold',
        }}>
        Tickets A Revision
      </Text>

      <FlatList
        data={data}
        renderItem={data => <CardTicketR data={data} navigation={navigation} />}
        keyExtractor={data.id}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  lista: {
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});
export default TicketRScreen;
