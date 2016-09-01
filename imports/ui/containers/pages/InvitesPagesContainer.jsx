import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Invitations } from '/imports/api/collections/invitations';
import { InvitesPageComponent } from '/imports/ui/components/pages/InvitesPageComponent/InvitesPageComponent';

function composer(props, onData) {
  const invitations = Meteor.subscribe('invites.received');

  if (invitations.ready()) {
    const user = Meteor.user();
    let invites = [];

    if (user) {
      invites = Invitations.find({
        targetId: user._id
      }, {
        sort: {
          sentAt: -1
        }
      }).fetch();
    }

    onData(null, {
      invites
    });
  }
}

export const InvitesPageContainer = composeWithTracker(composer)(InvitesPageComponent);
