import { Meteor } from 'meteor/meteor';

export function likePost(postId) {
  return () => {
    Meteor.call('likePost', postId, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });
  };
}
