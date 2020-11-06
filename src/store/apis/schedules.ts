import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

const accessToken = localStorage.getItem('access_token');
axios.defaults.headers.common['authorization'] = accessToken;

export const getSchedule = (churchId: number): Promise<AxiosResponse> => {
  return axios.get(`${secretIp}/api/schedules?churchId=${churchId}`);
};
