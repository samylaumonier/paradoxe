import { combineReducers } from 'redux';

import { chats } from './chats';
import { home } from './home';
import { user } from './user';
import { sidebar } from './sidebar';

const rootReducer = combineReducers({
  chats,
  home,
  user,
  sidebar,
});

export default rootReducer;
