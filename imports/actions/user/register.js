import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';
import Notifications from 'react-notification-system-redux';

export function register(username, email, password, callback) {
  return dispatch => {
    Accounts.createUser({
      username,
      email,
      password,
    }, err => {
      callback();

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
      } else {
        dispatch(
          Notifications.success({
            title: `Contact log in`,
            message: `Welcome ${username}!`,
            position: 'tr',
            autoDismiss: 3,
            dismissible: true
          })
        );
        browserHistory.push('/posts');
      }
    });
  };
}
