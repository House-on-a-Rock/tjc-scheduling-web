import {
    AuthActionTypes,
    LOGIN,
    LOGOUT,
    AuthState,
    REMEMBER_ME,
    FORGET_ME,
    SET_AUTH_STATE,
} from '../types';
import {
    getLocalStorageState,
    setLocalStorageState,
    removeLocalStorageState,
} from '../helpers/localStorage';

const initialState: AuthState = {
    isLoggedIn: false,
    isValidLogin: true,
    remembered: false,
    email: '',
    password: '',
};

export const authReducer = (
    state = getLocalStorageState('auth')
        ? { ...initialState, remembered: true, email: getLocalStorageState('auth').email }
        : initialState,
    action: AuthActionTypes,
): AuthState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                isValidLogin: true,
            };
        case LOGOUT:
            return {
                ...initialState,
            };
        case SET_AUTH_STATE:
            return {
                ...state,
                ...action.payload,
            };

        case REMEMBER_ME:
            setLocalStorageState('auth', {
                email: action.payload.email,
            });
            return state;

        case FORGET_ME:
            removeLocalStorageState('auth');
            return state;

        default:
            return state;
    }
};
