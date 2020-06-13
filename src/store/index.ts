import { createStore, combineReducers, compose } from 'redux';
import { authReducer } from './reducers/authReducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    authReducer: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

export const store = createStore(rootReducer, composeEnhancers());
