import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function getAllUsers() {
  return axios.get(`${secretIp}/api/users`);
}
