import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';
import { extractUserId } from '../../shared/utilities';
import { AddUserProps } from '../../shared/types';

const accessToken = localStorage.getItem('access_token');

export function getAllUsers(): Promise<AxiosResponse> {
  return axios.get(`${secretIp}/api/users`, {
    headers: { authorization: accessToken },
  });
}

export function getAllLocalMembers(churchId: number): Promise<AxiosResponse> {
  return axios.get(`${secretIp}/api/users?churchId=${churchId}`, {
    headers: { authorization: accessToken },
  });
}

export function getUser(userId: number): Promise<AxiosResponse> {
  return axios.get(`${secretIp}/api/users/${userId}`, {
    headers: { authorization: accessToken },
  });
}

export function deleteUser(userId: number): Promise<AxiosResponse> {
  const loggedInUserId = extractUserId(accessToken);
  if (loggedInUserId !== userId)
    return axios.delete(`${secretIp}/api/users/${userId}`, {
      headers: { authorization: accessToken },
    });
}

export function addUser({
  email,
  firstName,
  lastName,
  password,
  churchId,
}: AddUserProps): Promise<AxiosResponse> {
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
      headers: { authorization: accessToken },
    },
  );
}
