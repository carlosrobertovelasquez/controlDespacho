import jwtDecode from 'jwt-decode';
import {TOKEN} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function setToken(token) {
  AsyncStorage.setItem('token', token);
}

export function getToken() {
  AsyncStorage.getItem(TOKEN);
}

export function decodeToken(token) {
  return jwtDecode(token);
}
export function removeToken() {
  AsyncStorage.removeItem(TOKEN);
}
