import { ADD_POST, LIKE_POST } from '/imports/actions/home/posts';

const initialState = {
  posts: []
};

export function homePosts(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          {
            content: action.content
          }
        ]
      });
    case LIKE_POST:
      return Object.assign({}, state, {
        posts: state.posts.map(post => {
          if (post._id === action.postId) {
            const liked = post.likers.includes(action.userId);

            return Object.assign({}, post, {
              likes: liked ? post.likes - 1 : post.likes + 1,
              likers: liked
                ? _.without(post.likers, action.userId)
                : [...post.likers, action.userId]
            });
          }

          return post;
        })
      });
    default:
      return state;
  }
}
