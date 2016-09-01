import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Messages } from '/imports/api/collections/messages';
import { userHasContact } from '/imports/api/collections/users';

import { ChatPageComponent } from '/imports/ui/components/pages/ChatPageComponent/ChatPageComponent';

/** @namespace props.params.contactUsername */
function composer(props, onData) {
  const subscription = Meteor.subscribe('chat.messages', props.params.contactUsername);

  if (subscription.ready()) {
    const user = Meteor.user();
    const contact = Meteor.users.findOne({
      username: props.params.contactUsername
    });

    let hasContact = false;
    let messages = [];

    if (user && contact && userHasContact(user, contact._id)) {
      hasContact = true;

      messages = Messages.find({
        $or: [
          { userId: user._id, toUserId: { $in: [contact._id] } },
          { userId: contact._id, toUserId: { $in: [user._id] } },
          { userId: Meteor.settings.public.bot.id, toUserId: { $in: [user._id] }, contactId: { $in: [contact._id] } },
        ]
      }, {
        sort: {
          sentAt: -1
        }
      }).fetch();
    }

    onData(null, {
      user,
      hasContact,
      contact,
      messages
    });
  }
}

export const ChatPageContainer = composeWithTracker(composer)(ChatPageComponent);
