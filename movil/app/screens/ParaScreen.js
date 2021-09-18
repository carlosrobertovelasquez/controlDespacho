import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyTextInput from '@components/MyTextInput';
import MyButton from '@components/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ParaScreen({navigation}) {
  const [urApi, setUrApi] = useState('');
  useEffect(() => {
    parametros();
  }, []);

  const parametros = async () => {
    const urlApi = await AsyncStorage.getItem('urApi');
    setUrApi(urlApi);
  };
  const guardarStore = async () => {
    try {
      await AsyncStorage.removeItem(urApi);
      await AsyncStorage.setItem('urApi', urApi);
      volver();
    } catch (error) {
      console.log(error);
    }
  };
  const volver = async () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.master}>
      <MyTextInput
        placeholder="Direccion de Servidor Api"
        image="server"
        value={urApi}
        onChangeText={text => setUrApi(text)}
      />
      <MyButton titulo="Guardar" onPress={() => guardarStore()} />
    </View>
  );
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  ActivityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  parameter: {
    height: 20,
    width: 20,
  },
});
