import { POSTS_SUBSCRIPTION_READY, POSTS_SUBSCRIPTION_CHANGED } from '/imports/actions/home/posts/load';

const initialState = {
  ready: false,
  posts: [],
  users: [],
};

export function home(state = initialState, action) {
  switch (action.type) {
    case POSTS_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.ready,
      };
    case POSTS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        posts: action.data.posts,
        users: action.data.users,
      };
    default:
      return state;
  }
}
