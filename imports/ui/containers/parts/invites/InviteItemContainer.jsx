import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { InviteItemComponent } from '/imports/ui/components/parts/invites/InviteItemComponent/InviteItemComponent';

function composer(props, onData) {
  onData(null, {
    invite: props.invite,
    user: Meteor.users.findOne(props.invite.userId)
  });
}

export const InviteItemContainer = composeWithTracker(composer)(InviteItemComponent);
