import { ReducerDomains, LoadStateTypes } from '../types';
import { HttpError } from '../../shared/types/models';

export const AuthStateActions = mapLoadStateActions(ReducerDomains.AUTH)();

//this may be moved to a more appropriate location?
function mapLoadStateActions(domain: ReducerDomains) {
    return () => {
        return {
            Loaded: () => ({ domain: domain, type: LoadStateTypes.LOADED }),
            Loading: () => ({ domain: domain, type: LoadStateTypes.LOADING }),
            Error: (error: HttpError) => ({
                domain: domain,
                type: LoadStateTypes.ERROR,
                error: error,
            }),
        };
    };
}
