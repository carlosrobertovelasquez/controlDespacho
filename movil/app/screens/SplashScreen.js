import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/styles';
import useAuth from '@hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({navigation}) => {
  const {setUser} = useAuth();
  const [token, setToken] = useState('');
  useEffect(() => {
    fecthSesion();
    getStorage();
  }, []);

  const getStorage = async token => {
    try {
      const Storage = await AsyncStorage.getItem('token');
      setToken(Storage);
      setUser(Storage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={splashStyles.image}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
      <Animatable.Image
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{
          width: 200,
          height: 200,
          margin: 100,
        }}
        source={require('@recursos/images/LogoApro.png')}
      />
    </View>
  );
  async function fecthSesion() {
    if (!token) {
      setTimeout(() => {
        goToScreen('Login');
      }, 3000);
      return;
    }
    setTimeout(() => {
      goToScreen('Principal');
    }, 500);
  }
  function goToScreen(routeName) {
    navigation.replace(routeName);
  }
};

export default SplashScreen;
