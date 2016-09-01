import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { userHasBlockedContact } from '/imports/api/collections/users';

import { ChatNavbarComponent } from '/imports/ui/components/parts/chat/ChatNavbarComponent/ChatNavbarComponent';

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      ...props,
      userHasBlockedContact: userHasBlockedContact(user, props.contact._id),
    });
  }
}

export const ChatNavbarContainer = composeWithTracker(composer)(ChatNavbarComponent);
