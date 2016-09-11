import { Meteor } from 'meteor/meteor';

import { Notifications } from '/imports/api/collections/notifications';

export const NAVBAR_NOTIFICATIONS_SUBSCRIPTION = 'NAVBAR_NOTIFICATIONS_SUBSCRIPTION';
export const NAVBAR_NOTIFICATIONS_SUBSCRIPTION_READY = 'NAVBAR_NOTIFICATIONS_SUBSCRIPTION_READY';
export const NAVBAR_NOTIFICATIONS_SUBSCRIPTION_CHANGED = 'NAVBAR_NOTIFICATIONS_SUBSCRIPTION_CHANGED';

export function loadNotifications() {
  return dispatch => {
    dispatch({
      type: NAVBAR_NOTIFICATIONS_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('navbar.notifications'),
        get: () => {
          const notifications = Notifications.find({
            userId: Meteor.userId(),
          }, {
            sort: {
              createdAt: -1,
            },
          }).fetch();

          const users = Meteor.users.find({
            _id: {
              $in: _.uniq(_.pluck(notifications, 'targetId')),
            },
          }).fetch();

          return {
            notifications,
            users,
          }
        },
      },
    });
  };
}
