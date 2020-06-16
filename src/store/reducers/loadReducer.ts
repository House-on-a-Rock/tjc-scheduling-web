import { ReducerDomains, LoadTypes, LoadReducerState, LoadActionTypes } from '../types';

const initialState: LoadReducerState = {
    loadStatus: {
        [ReducerDomains.AUTH]: null,
        [ReducerDomains.PROFILE]: null,
        [ReducerDomains.TASKS]: null,
    },
    loadErrorStatus: {
        [ReducerDomains.AUTH]: null,
        [ReducerDomains.PROFILE]: null,
        [ReducerDomains.TASKS]: null,
    },
};

export const loadReducer = (state = initialState, action: LoadActionTypes) => {
    return mapActionToDomain(action.domain);

    function mapActionToDomain(domain: ReducerDomains) {
        switch (action.type) {
            case LoadTypes.LOADED:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: LoadTypes.LOADED,
                    },
                };
            case LoadTypes.LOADING:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: LoadTypes.LOADING,
                    },
                };
            case LoadTypes.ERROR:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: LoadTypes.ERROR,
                    },
                    loadErrorStatus: {
                        ...state.loadErrorStatus,
                        [domain]: action.error,
                    },
                };
            default:
                return state;
        }
    }
};
