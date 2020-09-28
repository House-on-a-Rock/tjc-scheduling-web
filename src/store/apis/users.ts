import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';
import { extractUserId } from '../../shared/utilities';

export function getAllUsers(): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/users`, {
    headers: {
      authorization: accessToken,
    },
  });
}

export function getAllLocalMembers(churchId: number): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/users?churchId=${churchId}`, {
    headers: {
      authorization: accessToken,
    },
  });
}

export function getUser(userId: number): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${secretIp}/api/users/${userId}`, {
    headers: {
      authorization: accessToken,
    },
  });
}

export function deleteUser(userId: number): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  const loggedInUserId = extractUserId(accessToken);
  if (loggedInUserId !== userId)
    return axios.delete(`${secretIp}/api/users/${userId}`, {
      headers: {
        authorization: accessToken,
      },
    });
}

export function addUser(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  churchId: number,
): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem('access_token');
  return axios.post(
    `${secretIp}/api/users`,
    {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      churchId: churchId,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
}
