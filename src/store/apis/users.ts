import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';
import { extractId } from '../actions/helper_functions';

export function getAllUsers(): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/users`, {
    headers: {
      authorization: accessToken,
    },
  });
}

export function getAllLocalChurchUsers(churchId: string): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/users?churchId=${churchId}`, {
    headers: {
      authorization: accessToken,
    },
  });
}

export function getOneUser(userId: string): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/users/${userId}`, {
    headers: {
      authorization: accessToken,
    },
  });
}

export function deleteUser(userId: string): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  const loggedInUser = extractId(accessToken);
  if (loggedInUser.toString() !== userId)
    return axios.delete(`${secretIp}/api/users/${userId}`, {
      headers: {
        authorization: accessToken,
      },
    });
}
