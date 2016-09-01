import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Posts } from '/imports/api/collections/posts';

import { PostsComponent } from '/imports/ui/components/parts/home/PostsComponent/PostsComponent';

function composer(props, onData) {
  const subscription = Meteor.subscribe('home.posts');

  if (subscription.ready()) {
    const user = Meteor.user();
    let posts = [];

    if (user) {
      const ids = user.profile ? user.profile.contacts : [];

      ids.push(user._id);

      posts = Posts.find({
        userId: {
          $in: ids
        }
      },{
        sort: {
          createdAt: -1
        }
      }).fetch();
    }

    onData(null, {
      posts
    });
  }
}

export const PostsContainer = composeWithTracker(composer)(PostsComponent);
