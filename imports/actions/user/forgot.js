import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import Notifications from 'react-notification-system-redux';

export function forgot(email, callback) {
  return dispatch => {
    Meteor.call('forget', email, err => {
      callback();

      if (err) {
        dispatch(
          Notifications.error({
            title: 'An error occurred',
            message: err.reason,
            position: 'tr',
            autoDismiss: 5,
            dismissible: true
          })
        );
      } else {
        dispatch(Notifications.success({
          title: 'Request password reset',
          message: 'You will receive an email to reset your password.',
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        }));

        browserHistory.push('/posts');
      }
    });
  };
}
