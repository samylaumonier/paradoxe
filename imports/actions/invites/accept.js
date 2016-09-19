import { Meteor } from 'meteor/meteor';
import Notifications from 'react-notification-system-redux';

import { Invites } from '/imports/api/collections/invites';

export function acceptInvite(inviteId) {
  return dispatch => {
    Meteor.call('acceptInvitation', inviteId, err => {
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
        Invites.remove(inviteId);
      }
    });
  };
}
