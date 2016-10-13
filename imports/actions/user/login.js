import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import Notifications from 'react-notification-system-redux';

export function login(username, password, callback) {
  return dispatch => {
    Meteor.loginWithPassword(username, password, err => {
      callback();

      if (err) {
        dispatch(Notifications.error({
          title: `An error occurred`,
          message: err.reason,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        }));
      } else {
        dispatch(Notifications.success({
          title: `Welcome back ${username}.`,
          message: 'It\'s good to see you !',
          position: 'tr',
          autoDismiss: 3,
        }));

        browserHistory.push('/posts');
      }
    });
  };
}
