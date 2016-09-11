import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

export function markNotificationSeen(notification) {
  return () => {
    Meteor.call('notificationSeen', notification._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    browserHistory.push(notification.url);
  };
}
