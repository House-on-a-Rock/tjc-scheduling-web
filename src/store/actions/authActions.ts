import { AuthActionTypes, LOGIN, LOGOUT } from '../types';

export const login = (): AuthActionTypes => ({ type: LOGIN });
export const logout = (): AuthActionTypes => ({ type: LOGOUT });

/* Thunk */
