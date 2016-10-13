import Notifications from 'react-notification-system-redux';

import { Posts } from '/imports/api/collections/posts';

export function addPost(content, callback) {
  return dispatch => {
    Posts.insert({
      content,
    }, err => {
      callback();

      if (err) {
        dispatch(Notifications.error({
          title: `An error occurred`,
          message: err.reason,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        }));
      }
    });
  };
}
