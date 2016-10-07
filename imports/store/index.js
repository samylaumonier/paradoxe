import { sources, subscriptions } from 'meteor/samy:redux-middlewares';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '/imports/reducers';

let store;

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  store = createStore(rootReducer, compose(
    applyMiddleware(sources, subscriptions, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
} else {
  store = createStore(rootReducer, compose(
    applyMiddleware(sources, subscriptions, thunk)
  ));
}

export default store;
