export const ADD_POST  = 'ADD_POST';
export const LIKE_POST = 'LIKE_POST';

export function addPost(content) {
  return {
    type: ADD_POST,
    content,
  };
}

export function likePost(postId, userId) {
  return {
    type: LIKE_POST,
    postId,
    userId,
  };
}
