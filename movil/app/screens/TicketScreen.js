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
import CardTicket from '@components/CardTicket';
const TicketScreen = ({navigation}) => {
  const {auth} = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    setIsLoading(false);
    var url = ServerApi;
    var request = `/listaTicketPreparador/${auth.idPreparador}`;
    await axios.post(url + request, {estado: '01'}).then(resp => {
      const datos = resp.data;
      setIsLoading(true);
      setData(datos);
    });
  }, [data]);

  const regresar = () => {
    navigation.navigate('Principal');
  };

  return (
    <ScrollView>
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
            <CardTicket data={data} navigation={navigation} />
          )}
          keyExtractor={data.id}
        />
      </View>
    </ScrollView>
  );
};

export default TicketScreen;
