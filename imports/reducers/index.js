import { combineReducers } from 'redux';

import { homePosts } from './home/posts';

const mainReducer = combineReducers({
  homePosts,
});

export default mainReducer;
