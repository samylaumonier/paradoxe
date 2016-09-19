import { Meteor } from 'meteor/meteor';
import Notifications from 'react-notification-system-redux';

export function inviteUsers(usernames) {
  return dispatch => {
    Meteor.call('inviteUsers', usernames, (err, res) => {
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
        const s = res > 1 ? 's' : '';

        dispatch(
          Notifications.success({
            title: `Invite${s} sent`,
            message: `${res} invite${s} sent!`,
            position: 'tr',
            autoDismiss: 5,
            dismissible: true
          })
        );
      }
    });
  };
}
