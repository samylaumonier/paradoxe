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
        let word = 'Invite';
        if (res > 1){
          word = 'Invites';
        }
        dispatch(
          Notifications.success({
            title: `${word} sent`,
            message: `${res} ${word} sent!`,
            position: 'tr',
            autoDismiss: 5,
            dismissible: true
          })
        );
      }
    });
  };
}
