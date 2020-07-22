import jwtDecode from 'jwt-decode';
import { JWTDataType } from '../types';

export function extractUserId(jwt: string) {
  let decodedAccessKey: JWTDataType = jwtDecode(jwt);
  return parseInt(decodedAccessKey.sub.split('|')[1]);
}

export function validateEmail(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}
