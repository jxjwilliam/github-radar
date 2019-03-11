import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import RootReducer from './reducers';

const store = createStore(
  RootReducer,
  compose(applyMiddleware(thunk, createLogger()))
);

export default store;
