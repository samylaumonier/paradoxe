import { Posts } from '/imports/api/collections/posts';

export function addPost(content) {
  return () => {
    Posts.insert({
      content
    });
  };
}
