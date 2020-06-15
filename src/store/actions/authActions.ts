import {
    AuthActionTypes,
    LOGIN,
    LOGOUT,
    REMEMBER_ME,
    EmailMemory,
    SET_AUTH_STATE,
    FORGET_ME,
} from '../types';

export const login = (): AuthActionTypes => ({ type: LOGIN });
export const logout = (): AuthActionTypes => ({ type: LOGOUT });
export const rememberMe = (remember: EmailMemory): AuthActionTypes => ({
    type: REMEMBER_ME,
    payload: remember,
});
export const forgetMe = (): AuthActionTypes => ({ type: FORGET_ME });
export const updateAuthState = (payload: any): AuthActionTypes => ({
    type: SET_AUTH_STATE,
    payload,
});

/* Thunk */
