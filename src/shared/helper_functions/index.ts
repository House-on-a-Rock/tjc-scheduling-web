import { HttpError } from '../types/models';

export function errorDataExtractor(error: any): HttpError {
    return {
        message: error.response?.data?.message,
        status: error.response?.status,
    };
}
