import { Meteor } from 'meteor/meteor';
import Notifications from 'react-notification-system-redux';

export function likePost(postId) {
  return dispatch => {
    Meteor.call('likePost', postId, err => {
      if (err) {
        dispatch(
          Notifications.error({
            title: `An error occurred`,
            message: err.reason,
            position: 'tr',
            autoDismiss: 5,
            dismissible: true
          })
        );
      }
    });
  };
}
