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
    isValidLogin: null,
    remembered: false,
    email: '',
    password: '',
};

const rememeberedLocalStorage = {
    isLoggedIn: false,
    isValidLogin: true,
    remembered: true,
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
                email: state.remembered ? state.email : '',
                password: '',
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                isValidLogin: null,
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
