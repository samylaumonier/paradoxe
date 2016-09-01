import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { NavbarNotificationItemComponent } from '/imports/ui/components/parts/app/navbar/NavbarNotificationItemComponent/NavbarNotificationItemComponent';

function composer(props, onData) {
  onData(null, {
    notification: props.notification,
    user: Meteor.users.findOne(props.notification.targetId)
  });
}

export const NavbarNotificationItemContainer = composeWithTracker(composer)(NavbarNotificationItemComponent);
