import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '/imports/reducers';

import sources from '/imports/middlwares/sources';
import subscriptions from '/imports/middlwares/subscriptions';

const logger = createLogger();

const store = createStore(rootReducer, compose(
  applyMiddleware(sources, subscriptions, thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
