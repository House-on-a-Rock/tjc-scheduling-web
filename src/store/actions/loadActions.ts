import { ReducerDomains, LoadTypes } from '../types';
import { HttpError } from '../../shared/types/models';

export const AuthStateActions = mapLoadStateActions(ReducerDomains.AUTH)();
export const ProfileStateActions = mapLoadStateActions(ReducerDomains.PROFILE)();
export const TaskStateActions = mapLoadStateActions(ReducerDomains.TASKS)();

//this may be moved to a more appropriate location?
function mapLoadStateActions(domain: ReducerDomains) {
    return () => {
        return {
            Loaded: () => ({ domain: domain, type: LoadTypes.LOADED }),
            Loading: () => ({ domain: domain, type: LoadTypes.LOADING }),
            Error: (error: HttpError) => ({
                domain: domain,
                type: LoadTypes.ERROR,
                payload: error,
            }),
            ErrorHandled: (error: HttpError) => ({
                domain: domain,
                type: LoadTypes.LOADED,
                payload: error,
            }),
        };
    };
}
