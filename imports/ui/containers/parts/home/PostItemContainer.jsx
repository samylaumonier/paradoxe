import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { PostItemComponent } from '/imports/ui/components/parts/home/PostItemComponent/PostItemComponent';

function composer(props, onData) {
  const userId = Meteor.userId();

  if (userId) {
    /** @namespace props.post.userId */
    onData(null, {
      post: props.post,
      user: Meteor.users.findOne(props.post.userId),
      currentUserId: userId,
    });
  }
}

export const PostItemContainer = composeWithTracker(composer)(PostItemComponent);
