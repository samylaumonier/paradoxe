import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { ChatTaggedMessageComponent } from '/imports/ui/components/parts/chat/ChatTaggedMessageComponent/ChatTaggedMessageComponent';

function composer(props, onData) {
  onData(null, {
    ...props,
    author: Meteor.users.findOne(props.message.userId),
  });
}

export const ChatTaggedMessageContainer = composeWithTracker(composer)(ChatTaggedMessageComponent);
