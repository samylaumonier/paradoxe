import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '/imports/reducers';

import sources from '/imports/middlewares/sources';
import subscriptions from '/imports/middlewares/subscriptions';

let store;

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  store = createStore(rootReducer, compose(
    applyMiddleware(sources, subscriptions, thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
} else {
  store = createStore(rootReducer, compose(
    applyMiddleware(sources, subscriptions, thunk)
  ));
}

export default store;
