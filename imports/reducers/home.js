import { POSTS_SUBSCRIPTION_READY, POSTS_SUBSCRIPTION_CHANGED } from '/imports/actions/home/posts/load';

const initialState = {
  postsReady: false,
  posts: [],
};

export function home(state = initialState, action) {
  switch (action.type) {
    case POSTS_SUBSCRIPTION_READY:
      return {
        ...state,
        postsReady: action.ready,
      };
    case POSTS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        posts: action.data,
      };
    default:
      return state;
  }
}
