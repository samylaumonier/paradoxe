import { Meteor } from 'meteor/meteor';

import { Invites } from '/imports/api/collections/invites';

export function acceptInvite(inviteId) {
  return () => {
    Meteor.call('acceptInvitation', inviteId, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        Invites.remove(inviteId);
        toastr.success('Invitation accepted');
      }
    });
  };
}
