import React, {useState, useEffect} from 'react';
import {loginStyles} from '@styles/styles';
import MyTextInput from '@components/MyTextInput';
import MyButton from '@components/MyButton';
import {version} from '../../package.json';
import {
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import color from '@styles/colors';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken, getToken} from '@recursos/token';
import useAuth from '@hooks/useAuth';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setloading] = useState(false);
  const {setUser} = useAuth();
  const [parame, setParame] = useState('');

  const iniciarSesion = async () => {
    setloading(true);
    var url = ServerApi;
    var request = '/login';
    try {
      axios
        .post(url + request, {email, password})
        .then(resp => {
          const {token} = resp.data;

          // guardarStorage(token);
          setToken(token);
          setUser(token);
          navigation.navigate('Principal');
          setloading(false);
        })
        .catch(er => {
          const {error} = er.response.data;
          Alert.alert('Error !!!', `Problemas con ${error}`);
          setloading(false);
        });
    } catch (error) {
      console.log('Sin conexion a Servidor');
    }
  };

  useEffect(() => {
    leerParameter(parame);
  }, [parame]);
  const leerParameter = async parame => {
    const urlApi = await AsyncStorage.getItem('urApi');
    setParame(urlApi);
    // if (!urlApi) {
    //   Parametros();
    // }
  };
  function goToScreen(routeName) {
    navigation.replace(routeName);
  }
  const Parametros = async () => {
    navigation.navigate('Param');
  };
  return (
    <ScrollView>
      <View style={[loginStyles.container, {padding: 50}]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => Parametros()}>
          <Image
            source={require('@recursos/images/configuraciones.png')}
            style={styles.parameter}
          />
        </TouchableOpacity>

        <StatusBar backgroundColor={color.BLUE} translucent={true} />
        <View style={loginStyles.logo}>
          <Image
            source={require('@recursos/images/logo.jpeg')}
            style={{height: 150, width: 150}}
          />
        </View>
        <MyTextInput
          placeholder="Usuario"
          image="user"
          value={email}
          autoCapitalize="none"
          onChangeText={email => setEmail(email)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Contraseña"
          image="lock"
          bolGone={true}
          secureTextEntry={hidePassword}
          onPress={() => setHidePassword(!hidePassword)}
          value={password}
          onChangeText={passsword => setPassword(passsword)}
        />
        <Text>Versión {version}</Text>
        <MyButton titulo="Iniciar Sesión" onPress={() => iniciarSesion()} />
      </View>
      <Modal transparent={true} animationType={'none'} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.ActivityIndicatorWrapper}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
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
export default LoginScreen;
