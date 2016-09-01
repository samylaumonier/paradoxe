import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { ChatComponent } from '/imports/ui/components/parts/chat/ChatComponent/ChatComponent';

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      props
    });
  }
}

export const ChatContainer = composeWithTracker(composer)(ChatComponent);
