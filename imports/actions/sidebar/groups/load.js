import { Meteor } from 'meteor/meteor';
import { Groups } from '/imports/api/collections/groups';

export const SIDEBAR_GROUPS_SUBSCRIPTION = 'SIDEBAR_GROUPS_SUBSCRIPTION';
export const SIDEBAR_GROUPS_SUBSCRIPTION_READY = 'SIDEBAR_GROUPS_SUBSCRIPTION_READY';
export const SIDEBAR_GROUPS_SUBSCRIPTION_CHANGED = 'SIDEBAR_GROUPS_SUBSCRIPTION_CHANGED';

export function loadGroups() {
  return dispatch => {
    dispatch({
      type: SIDEBAR_GROUPS_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('sidebar.groups'),
        get: () => {
          const userId = Meteor.userId();

          if (userId) {
            return Groups.find({
              users: {
                $in: [userId]
              }
            }, {
              sort: {
                username: 1
              }
            }).fetch();
          }

          return [];
        },
      },
    });
  };
}
