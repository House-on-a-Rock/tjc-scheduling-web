import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function recoverEmail(email: string): Promise<AxiosResponse> {
  return axios.post(`${secretIp}/api/authentication/sendResetEmail`, {
    email: email,
  });
}

export function checkResetToken(token: string): Promise<AxiosResponse> {
  return axios.get(`${secretIp}/api/authentication/checkResetToken`, {
    headers: {
      authorization: token,
    },
  });
}

export function authenticateLogin(
  email: string,
  password: string,
): Promise<AxiosResponse> {
  return axios.post(`${secretIp}/api/authentication/login`, {
    email: email,
    password: password,
  });
}

export function sendNewPassword(
  token: string,
  newPassword: string,
): Promise<AxiosResponse> {
  return axios.post(
    `${secretIp}/api/authentication/resetPassword`,
    { email: 'shaun.tung@gmail.com', password: newPassword },
    {
      headers: {
        authorization: token,
      },
    },
  );
}
