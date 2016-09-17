import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import { chats } from './chats';
import { home } from './home';
import { invites } from './invites';
import { navbar } from './navbar';
import { user } from './user';
import { sidebar } from './sidebar';

const rootReducer = combineReducers({
  chats,
  home,
  invites,
  navbar,
  user,
  sidebar,
  notifications,
});

export default rootReducer;
