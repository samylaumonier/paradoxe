import { combineReducers } from 'redux';

import { chats } from './chats';
import { home } from './home';
import { invites } from './invites';
import { user } from './user';
import { sidebar } from './sidebar';

const rootReducer = combineReducers({
  chats,
  home,
  invites,
  user,
  sidebar,
});

export default rootReducer;
