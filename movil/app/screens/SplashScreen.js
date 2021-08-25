import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {imageBackgroundStyle} from '@styles/General';

const SplashScreen = ({navigation}) => {
  const goToScreen = routeName => {
    navigation.navigate(routeName);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      goToScreen('Login');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={imageBackgroundStyle.image}>
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
        source={require('@recursos/imagen/logo.jpeg')}
      />
    </View>
  );
};

export default SplashScreen;
