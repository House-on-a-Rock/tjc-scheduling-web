import { HttpError } from '../types/models';
import { useLocation } from 'react-router-dom';

export function errorDataExtractor(error: any): HttpError {
    return {
        message: error.response?.data?.message,
        status: error.response?.status,
    };
}

export const useQuery = () => new URLSearchParams(useLocation().search);
