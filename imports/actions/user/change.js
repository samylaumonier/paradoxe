import { browserHistory } from 'react-router';

import Notifications from 'react-notification-system-redux';

export function change(oldPassword, newPassword, callback) {
  return dispatch => {
    Accounts.changePassword(oldPassword, newPassword, err => {
      callback();

      if (err) {
        dispatch(Notifications.error({
          title: 'An error occurred',
          message: err.reason,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        }));
      }
      else {
        dispatch(Notifications.success({
          title: 'Password changed',
          message: 'Your password was changed successfully.',
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        }));

        browserHistory.push('/posts');
      }
    });
  };
}

