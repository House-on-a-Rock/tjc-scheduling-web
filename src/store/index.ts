import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer, loadReducer, membersReducer, profileReducer } from './reducers';
import ReduxThunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  load: loadReducer,
  members: membersReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk)),
);
