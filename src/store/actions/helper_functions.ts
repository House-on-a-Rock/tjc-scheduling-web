import jwtDecode from 'jwt-decode';
import { JWTDataType } from '../types';

export function extractId(jwt: string) {
  let decodedAccessKey: JWTDataType = jwtDecode(jwt);
  return parseInt(decodedAccessKey.sub.split('|')[1]);
}
