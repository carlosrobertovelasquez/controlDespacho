import React from 'react';
import {View, Text} from 'react-native';
import {loginStyles, mainStyles} from '@styles/styles';
export default function Registro() {
  return (
    <View
      style={{
        flex: 3,
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: 'red',
      }}>
      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontWeight: 'bold'}}>Pedido</Text>
          <Text style={{fontWeight: 'bold'}}>80</Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>Linea</Text>
          <Text style={{fontWeight: 'bold'}}>90</Text>
        </View>
      </View>
    </View>
  );
}
