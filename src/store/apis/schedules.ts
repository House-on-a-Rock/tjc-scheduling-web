import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';
import { AddScheduleProps, AddServiceProps } from '../../shared/types/models';

const accessToken = localStorage.getItem('access_token');
axios.defaults.headers.common['authorization'] = accessToken;

export const getTabs = (churchId: number): Promise<AxiosResponse> => {
  return axios.get(`${secretIp}/api/schedules/tabs?churchId=${churchId}`);
};

//rename this to get tab data or something
export const getSchedule = (scheduleId: number): Promise<AxiosResponse> => {
  console.log('grabbing schedule');
  return axios.get(`${secretIp}/api/schedules?churchId=${scheduleId}`);
};

export const addSchedule = ({
  scheduleTitle,
  startDate,
  endDate,
  view,
  team,
  churchId,
}: AddScheduleProps) => {
  return axios.post(`${secretIp}/api/schedules`, {
    title: scheduleTitle,
    startDate,
    endDate,
    view,
    team,
    churchId,
  });
};

export const addService = ({ name, order, dayOfWeek, scheduleId }: AddServiceProps) =>
  axios.post(`${secretIp}/api/services`, {
    name,
    order,
    dayOfWeek,
    scheduleId,
  });
