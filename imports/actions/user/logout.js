import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import Notifications from 'react-notification-system-redux';

export function logout() {
  return dispatch => {
    Meteor.logout(err => {
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
        browserHistory.push('/login');
      }
    });
  };
}
