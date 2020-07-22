import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';
import { extractUserId } from '../actions/helper_functions';

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
  const loggedInUser = extractUserId(accessToken);
  if (loggedInUser.toString() !== userId)
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
  churchId: string,
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
