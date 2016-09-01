import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Notifications } from '/imports/api/collections/notifications';
import { NavbarComponent } from '/imports/ui/components/parts/app/navbar/NavbarComponent/NavbarComponent';

function composer(props, onData) {
  const invitesSubscription = Meteor.subscribe('navbar.invites');
  const notificationSubscription = Meteor.subscribe('navbar.notifications');

  if (invitesSubscription.ready() && notificationSubscription.ready()) {
    const invites = Counts.get('navbar.invites');
    const user = Meteor.user();

    let notifications = Notifications.find({
      userId: user._id
    },{
      sort: {
        createdAt: -1
      }
    }).fetch();

    onData(null, {
      hasNotifications: notifications.length > 0,
      notificationCount: notifications.length,
      notifications,
      hasInvites: invites > 0,
      invites
    });
  }
}

export const NavbarContainer = composeWithTracker(composer)(NavbarComponent);
