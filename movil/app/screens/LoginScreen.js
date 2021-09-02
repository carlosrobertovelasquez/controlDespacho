import React, {useState, useEffect} from 'react';
import {loginStyles} from '@styles/styles';
import MyTextInput from '@components/MyTextInput';
import MyButton from '@components/MyButton';
import {Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import color from '@styles/colors';
import {ServerApi} from '@recursos/ServerApi';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';
import {setToken, getToken} from '@recursos/token';
import useAuth from '@hooks/useAuth';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const {setUser} = useAuth();

  const iniciarSesion = async () => {
    var url = ServerApi;
    var request = '/login';
    axios.post(url + request, {email, password}).then(resp => {
      if (resp.data.length > 0) {
        console.log(resp);
      } else {
        try {
          const {token} = resp.data;

          guardarStorage(token);
          setToken(token);
          setUser(token);
          goToScreen('Principal');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const guardarStorage = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  };

  function goToScreen(routeName) {
    navigation.replace(routeName);
  }
  return (
    <View style={[loginStyles.container, {padding: 50}]}>
      <StatusBar backgroundColor={color.BLUE} translucent={true} />
      <View style={loginStyles.logo}>
        <Image
          source={require('@recursos/images/logo.jpeg')}
          style={{height: 150, width: 150}}
        />
      </View>
      <MyTextInput
        keyboardType="email-address"
        placeholder="E-mail"
        image="user"
        value={email}
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
      <MyButton titulo="Iniciar Sesión" onPress={() => iniciarSesion()} />
    </View>
  );
};

export default LoginScreen;
