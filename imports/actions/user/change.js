import { browserHistory } from 'react-router';

import Notifications from 'react-notification-system-redux';

export function change(oldPassword, newPassword) {
  return dispatch => {
    Accounts.changePassword(oldPassword, newPassword, err => {
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
      else {
        dispatch(
          Notifications.success({
            title: `Password change`,
            message: `Your password was changes successfully.`,
            position: 'tr',
            autoDismiss: 5,
            dismissible: true
          })
        );
        browserHistory.push('/posts');
      }
    });
  };
}

