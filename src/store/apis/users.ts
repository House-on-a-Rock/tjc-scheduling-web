import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function getAllUsers(): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/users`, {
    headers: {
      authorization: accessToken,
    },
  });
}
