import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';
const accessToken = localStorage.getItem('access_token');

export const getSchedule = (churchId: number): Promise<AxiosResponse> => {
  return axios.get(`${secretIp}/api/schedules2?churchId=${churchId}`, {
    headers: {
      authorization: accessToken,
    },
  });
};
