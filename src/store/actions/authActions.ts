import axios from 'axios';
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
import { secretIp } from '../../../secrets/secretStuff';

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
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        await axios
            .post(secretIp + '/api/authentication/login', {
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response);
            });
    };
};

export const checkResetToken = (token: string): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        await axios
            .get(secretIp + '/api/authentication/checkResetToken', {
                headers: {
                    authorization:
                        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMTUwLjUwOjgwODAvYXBpLyIsInN1YiI6InRqYy1zY2hlZHVsaW5nfDUiLCJleHAiOjE1OTI0MjI2NzksInR5cGUiOiJwd2RfcmVzZXQiLCJpYXQiOjE1OTIzMzYyNzl9.VW_qKiE4e5keG-emrVs4TRArFTnvy3dAaQvGHWlAhIgLnuxPZKQfUu9x6WIQUnm-qjfxW4G6umUcULFqB5ktf5NZazgjJ3HYVjzPuWy3NuSsDPQ6V5afA3mlfvRHXFVLZ77LH4_DiRFxjWiay-cAAMDdviwbd9UufBkO5LNMvIlZsxXv9DPvFiSIwVtO-Bmu-c_dLcnzyD0k7GdSyLqtzp72SmgK1BgK2YLdxpLhhETz0eZ5s8jPh0S41D5B0Dc9UbwF63erBp4AZRK6x1to002ToS6tpors6roxMCKnwPXfmKcBd_IOrZG_22yLzJABZRTrAPQljKbhIS95n_ozo34l3E0_lvKYnnsXUCWay2VfpHDa0qoW6xd4WT60VvZCFfn7MNH9DsMTdGLhBdp5okT7h0Ewl0NCjKipO30aCUMcGIK0WJKWb4qAT0vx_37qbNdExBEgY4WzZ_x8bG_KInwNtkuENXom_Z3L8VVdDRLZclny17_MHqnzt61RItk46ld0lK5T1yF-XVdXDLgdfc5lthuFD42Ccax02DA02g7fnYv5PtVJ192PhuuypWS5YKZlr-1Bt7RYKNLAEwxxghVuQkeTbgoX8AJasT-OH0l3-tLLibhyCg6qTsx_IelWbKGg0fuCrN0-gdXjAa_qJ_a83wPJJc2C3EPrF9LTU',
                },
            })
            // 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMTUwLjUwOjgwODAvYXBpLyIsInN1YiI6InRqYy1zY2hlZHVsaW5nfDUiLCJleHAiOjE1OTIyNzIwMzMsInR5cGUiOiJwd2RfcmVzZXQiLCJpYXQiOjE1OTIyNjQ4MzN9.sdmy1PzEZrDN-VvnXR_ir8nwuIKmPGExjGxISlDXtTeZGKjN9LV04bT5V5wVpPXvp0ZPk6zeswow0NnbCIAdbXe6YOdsqBnbIAiODCkZEpAOrmTe4S_1qvyy79R3f-kOh0VtoIGDzYJ-o1KjoWK96y14iv67lweJKEaE0rOKT_yp7lmzIBJWziCYqLj--09bqdYuv46zuZAp3Hm9utS0FT9yp4DuVHr16SaMA7ZqRZeYOEhSDVSy1j1HUYZ-rKk4lqpO85iCssihp9ESZWDyX_zsCR7ZFxOyMfBngxnFPrABVYzBXxgvoZLIsz00kDGrhsSmBh1uMrz_sKvcQuFIAyRGJXyiJh2S8iKOnidBDfX1DyO3Uw-rs4OR6Tbe7muzyc4r4YT4gfwNdcQjnMyDMSOylXXJQBQtoOrah5_u25VnpUGH3RDt1Bi8O2N8QpWyMHgZ2t4jGvqdVA7rEdbrVBUvW0Zgp_VhJwi5HG05XU7OUbP38NTZNJ2vUnTdvLdLFKt_YWSIQi_YcI-aK-rZXaG5DHuNFw7yye6rVXKqjzBhJ7gtIfWNQLBVABA9v7iwSWK2ZBJaqzOzoadyERplRaYjjH_VQkqMQ1MULD0DdG6Gvvlj_PjTSjTTkyc4vZb6o0_T3fiiNnG1m0-T-fM4VZJvUoshYVb8lxRMY5-B0EE',
            .then((res) => {
                console.log('res', res);
                if (res.status === 200) dispatch(AuthStateActions.Loaded);
                else
                    dispatch(
                        AuthStateActions.Error({
                            status: res.status,
                            message: res.statusText,
                        }),
                    );
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    AuthStateActions.Error({
                        status: error.response.status,
                        message: error.response.statusText,
                    }),
                );
            });
    };
};
