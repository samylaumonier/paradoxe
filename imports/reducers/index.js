import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import { chats } from './chats';
import { home } from './home';
import { invites } from './invites';
import { navbar } from './navbar';
import { profile } from './profile';
import { settings } from './settings';
import { user } from './user';
import { videos } from './videos';
import { sidebar } from './sidebar';

const rootReducer = combineReducers({
  chats,
  home,
  invites,
  navbar,
  profile,
  settings,
  sidebar,
  user,
  videos,
  notifications,
});

export default rootReducer;
