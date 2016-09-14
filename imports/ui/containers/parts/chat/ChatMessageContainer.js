import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { ChatMessageComponent } from '/imports/ui/components/parts/chat/ChatMessageComponent';

function composer(props, onData) {
  const author = Meteor.users.findOne(props.message.userId);

  if (author) {
    onData(null, {
      message: props.message,
      author
    });
  }
}

export const ChatMessageContainer = composeWithTracker(composer)(ChatMessageComponent);
