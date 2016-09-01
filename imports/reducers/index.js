import { combineReducers } from 'redux';

import { chats } from './chats';
import { user } from './user';

const rootReducer = combineReducers({
  chats,
  user,
});

export default rootReducer;
