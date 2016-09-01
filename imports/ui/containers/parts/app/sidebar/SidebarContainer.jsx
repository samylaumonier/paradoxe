import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { SidebarComponent } from '/imports/ui/components/parts/app/sidebar/SidebarComponent/SidebarComponent';

function composer(props, onData) {
  const subscription = Meteor.subscribe('sidebar.contacts');

  if (subscription.ready()) {
    const user = Meteor.user();
    let contacts = [];

    if (user) {
      const ids = user.profile ? user.profile.contacts : null;

      if (ids) {
        contacts = Meteor.users.find({
          _id: {
            $in: ids
          }
        }).fetch();
      }
    }

    onData(null, {
      user: Meteor.user(),
      contacts
    });
  }
}

export const SidebarContainer = composeWithTracker(composer)(SidebarComponent);
