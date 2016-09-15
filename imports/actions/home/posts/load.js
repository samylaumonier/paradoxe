import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/api/collections/posts';

export const HOME_POSTS_SUBSCRIPTION = 'HOME_POSTS_SUBSCRIPTION';
export const HOME_POSTS_SUBSCRIPTION_READY = 'HOME_POSTS_SUBSCRIPTION_READY';
export const HOME_POSTS_SUBSCRIPTION_CHANGED = 'HOME_POSTS_SUBSCRIPTION_CHANGED';

export function loadPosts() {
  return dispatch => {
    dispatch({
      type: HOME_POSTS_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('home.posts'),
        get: () => {
          const user = Meteor.user();

          if (user) {
            const ids = user.profile && user.profile.contacts ? user.profile.contacts : [];
            ids.push(user._id);

            const posts = Posts.find({
              userId: {
                $in: ids,
              },
            },{
              sort: {
                createdAt: -1,
              },
            }).fetch();

            const users = Meteor.users.find({
              _id: {
                $in:  _.uniq(_.pluck(posts, 'userId')),
              },
            }).fetch();

            return {
              posts,
              users,
            };
          }

          return {
            posts: [],
            users: [],
          };
        },
      },
    });
  };
}
