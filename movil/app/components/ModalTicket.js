import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
export default function ModalTicket(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidadPreparada, setCantidadPreparada] = useState('0');
  const [searchCodigoBarra, setSearchCodigoBarra] = useState('');
  //console.log(props.data.item);
  // setModalVisible(props.modalVisible);

  const LeerCodigoBarra = () => {
    const encontro = buscarBarra();
    for (let index = 0; index < encontro.length; index++) {
      const element = encontro[index];
      if (
        element.articulo === searchCodigoBarra ||
        element.codigoBarrasInvt === searchCodigoBarra ||
        element.codigoBarrasVent === searchCodigoBarra
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
            guardar(element.articulo, element.cantidad);
          }
        }
      }
    }
  };
  const buscarBarra = () => {
    const result = data.filter(
      ticket =>
        ticket.articulo === searchCodigoBarra ||
        ticket.codigoBarrasInvt === searchCodigoBarra ||
        ticket.codigoBarrasVent === searchCodigoBarra,
    );
    return result;
  };
  const handleKeyPress = ({nativeEvent: {key: keyValue}}) => {
    console.log(keyValue);
    //aqui el codigo de barra
  };
  const guardar = (articulo, cantidad) => {
    const cantPedida1 = parseFloat(cantidad);
    if (cantidadPreparada < cantPedida1) {
      Alert.alert('Guardar', 'Quiere proceder a Guardar', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'SI', onPress: () => irGuardar(articulo)},
      ]);
    } else {
      irGuardar(articulo);
    }
  };

  const irGuardar = async articulo => {
    //Actualizamos en la tabla preparados

    var url = ServerApi;
    var request = '/getUpdatePrepraro';

    await axios
      .post(url + request, {
        cantidad: cantidadPreparada,
        ticket: params,
        articulo: articulo,
      })
      .then(resp => {
        const datos = resp;
        setTextSearch('');
        setSearchCodigoBarra('');
        setModal(false);
        setCantidadPreparada('0');
      });
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  ADICIONAR ARTICULOS
                </Text>
              </View>

              <TextInput
                style={styles.inputSearch}
                onChangeText={text => setSearchCodigoBarra(text)}
                value={searchCodigoBarra}
                placeholder="Leer Codigo Barra ...."
                onKeyPress={handleKeyPress}
                autoFocus={true}
                onChange={() => LeerCodigoBarra()}></TextInput>
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
              </View>
              <View
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Text>Contadas</Text>
                <TextInput
                  style={[styles.text, {color: '#FF0000'}]}
                  keyboardType="numeric"
                  editable={false}
                  value={cantidadPreparada}
                  onChange={text => setCantidadPreparada(text)}
                />
              </View>
            </View>

            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
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
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  text: {
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
  },
});
