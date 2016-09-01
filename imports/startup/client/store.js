import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import mainReducer from '/imports/reducers';

const logger = createLogger();
const store = createStore(
  mainReducer,
  applyMiddleware(thunk, promise, logger)
);

export default store;
