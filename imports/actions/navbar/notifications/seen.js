import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import Notifications from 'react-notification-system-redux';

export function markNotificationSeen(notification) {
  return dispatch => {
    Meteor.call('notificationSeen', notification._id, err => {
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
    browserHistory.push(notification.url);
  };
}
