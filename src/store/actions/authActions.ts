import { ThunkAction } from 'redux-thunk';
import {
  AuthActionTypes,
  LOGIN,
  LOGOUT,
  REMEMBER_ME,
  EmailMemory,
  FORGET_ME,
} from '../types';
import { AuthStateActions } from './loadActions';
import { Action } from 'redux';
import {
  recoverEmail,
  checkResetToken,
  authenticateLogin,
  sendNewPassword,
} from '../apis';
import { errorDataExtractor } from '../../shared/utilities/helperFunctions';

export const login = (): AuthActionTypes => ({ type: LOGIN });
export const logout = (): AuthActionTypes => ({ type: LOGOUT });
export const rememberMe = (remember: EmailMemory): AuthActionTypes => ({
  type: REMEMBER_ME,
  payload: remember,
});
export const forgetMe = (): AuthActionTypes => ({ type: FORGET_ME });

/* Thunk */

export const onValidated = (): ThunkAction<any, any, any, Action> => (dispatch) => {
  dispatch(login());
  dispatch(AuthStateActions.Loaded());
};

export const checkCredentials = (
  email: string,
  password: string,
): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      const response = await authenticateLogin(email, password);
      dispatch(AuthStateActions.Loading());
      localStorage.setItem('access_token', response.data.access_token);
      response.status === 200
        ? dispatch(onValidated())
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

export const sendAuthEmail = (
  email: string,
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  dispatch(AuthStateActions.Loading());
  try {
    const response = await recoverEmail(email);
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

export const resetPassword = (
  token: string,
  newPassword: string,
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  dispatch(AuthStateActions.Loading());
  try {
    const response = await sendNewPassword(token, newPassword);
    response.status === 201
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
