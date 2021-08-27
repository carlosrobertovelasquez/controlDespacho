import {StyleSheet} from 'react-native';
import Colors from './color';

const imageBackgroundStyle = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
});

export {imageBackgroundStyle};
