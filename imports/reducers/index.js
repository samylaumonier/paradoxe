import { combineReducers } from 'redux';

import { chats } from './chats';
import { user } from './user';
import { sidebar } from './sidebar';

const rootReducer = combineReducers({
  chats,
  user,
  sidebar,
});

export default rootReducer;
