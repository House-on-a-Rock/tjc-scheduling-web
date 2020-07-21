import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function getUserTasks(token: string, userId: string): Promise<AxiosResponse> {
  return axios.get(`${secretIp}/api/tasks?userId=${userId}`, {
    headers: {
      authorization: token,
    },
  });
}
