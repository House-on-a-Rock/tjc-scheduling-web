import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function getAllUsers(token: string): Promise<AxiosResponse> {
  return axios.get(`${secretIp}/api/users`, {
    headers: {
      authorization: token,
    },
  });
}
