import { Meteor } from 'meteor/meteor';

import { Invites } from '/imports/api/collections/invites';

export const INVITES_PAGE_SUBSCRIPTION = 'INVITES_PAGE_SUBSCRIPTION';
export const INVITES_PAGE_SUBSCRIPTION_READY = 'INVITES_PAGE_SUBSCRIPTION_READY';
export const INVITES_PAGE_SUBSCRIPTION_CHANGED = 'INVITES_PAGE_SUBSCRIPTION_CHANGED';

export function loadInvites() {
  return dispatch => {
    dispatch({
      type: INVITES_PAGE_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('invites.received'),
        get: () => {
          const user = Meteor.user();

          if (user) {
            const invites = Invites.find({
              targetId: user._id,
            }, {
              sort: {
                sentAt: -1,
              },
            }).fetch();

            const users = Meteor.users.find({
              _id: {
                $in: _.uniq(_.pluck(invites, 'userId')),
              },
            }).fetch();

            return {
              invites,
              users,
            };
          }

          return {
            invites: [],
            users: [],
          };
        },
      },
    });
  };
}
