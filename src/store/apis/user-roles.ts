import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function getUserRoles(userId: number): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/user-roles/${userId}`, {
    headers: {
      authorization: accessToken,
    },
  });
}
