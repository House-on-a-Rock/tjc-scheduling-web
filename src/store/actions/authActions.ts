import axios, { AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import {
    AuthActionTypes,
    LOGIN,
    LOGOUT,
    REMEMBER_ME,
    EmailMemory,
    SET_AUTH_STATE,
    FORGET_ME,
} from '../types';
import { AuthStateActions } from './loadActions';
import { Action } from 'redux';
import { recoverEmail, checkResetToken, authenticateLogin } from '../apis';
import { errorDataExtractor } from '../../shared/helper_functions';

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

export const checkCredentials = (
    email: string,
    password: string,
): ThunkAction<any, any, any, Action> => {
    console.log('check', email, password);
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        try {
            const response = await authenticateLogin(email, password);
            localStorage.setItem('access_token', response.data.access_token);
            console.log(response);
            // prep home page
            response.status === 200
                ? dispatch(AuthStateActions.Loaded())
                : dispatch(
                      AuthStateActions.Error({
                          status: response.status,
                          message: response.statusText,
                      }),
                  );
        } catch (error) {
            console.log(error);
            const errorData = errorDataExtractor(error);
            dispatch(AuthStateActions.Error(errorData));
        }
    };
};

export const validateResetToken = (token: string): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        try {
            const response = await checkResetToken(token);
            response.status === 200
                ? dispatch(AuthStateActions.Loaded())
                : dispatch(
                      AuthStateActions.Error({
                          status: response.status,
                          message: response.statusText,
                      }),
                  );
        } catch (error) {
            const errorData = errorDataExtractor(error);
            dispatch(AuthStateActions.Error(errorData));
        }
    };
};

export const sendResetEmail = (email: string): ThunkAction<any, any, any, Action> => {
    console.log('sendResetEmail');
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        console.log(email);
        try {
            const response = await recoverEmail(email);
            dispatch(AuthStateActions.Loaded());
        } catch (error) {
            const errorData = errorDataExtractor(error);
            dispatch(AuthStateActions.Error(errorData));
        }
    };
};
