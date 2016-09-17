import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import Notifications from 'react-notification-system-redux';

export function login(username, password) {
  return dispatch => {
    Meteor.loginWithPassword(username, password, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        dispatch(
          Notifications.success({
            title: `Welcome back ${username}.`,
            message: 'It\'s good to see you !',
            position: 'tr',
            autoDismiss: 3,
          })
        );
        browserHistory.push('/posts');
      }
    });
  };
}
