import { HttpError } from '../types/models';
import { useLocation } from 'react-router-dom';

export function errorDataExtractor(error: any): HttpError {
    return {
        message: error.response?.data?.message,
        status: error.response?.status,
    };
}

export const useQuery = () => new URLSearchParams(useLocation().search);

export const getLocalStorageState = (type: string) =>
    JSON.parse(localStorage.getItem(`${type}_state`));

export const setLocalStorageState = (type: string, newState: object) =>
    localStorage.setItem(`${type}_state`, JSON.stringify(newState));

export const removeLocalStorageState = (type: string) =>
    localStorage.removeItem(`${type}_state`);

export function isValidEmail(emailValue: string): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailValue).toLowerCase());
}
