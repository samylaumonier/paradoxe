import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';

export function markNotificationSeen(notification) {
  return dispatch => {
    Meteor.call('notificationSeen', notification._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    dispatch(push(notification.url));
  };
}
