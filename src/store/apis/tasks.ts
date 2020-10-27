import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function getUserTasks(userId: number): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/tasks?userId=${userId}`, {
    headers: {
      authorization: accessToken,
    },
  });
}
