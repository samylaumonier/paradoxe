import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import rootReducer from '/imports/reducers';

const logger = createLogger();

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk, promise, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
