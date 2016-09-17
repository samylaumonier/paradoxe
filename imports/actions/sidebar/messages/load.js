import { Meteor } from 'meteor/meteor';

import { getSidebarMessages } from '/imports/api/collections/messages';

export const SIDEBAR_MESSAGES_SUBSCRIPTION = 'SIDEBAR_MESSAGES_SUBSCRIPTION';
export const SIDEBAR_MESSAGES_SUBSCRIPTION_READY = 'SIDEBAR_MESSAGES_SUBSCRIPTION_READY';
export const SIDEBAR_MESSAGES_SUBSCRIPTION_CHANGED = 'SIDEBAR_MESSAGES_SUBSCRIPTION_CHANGED';

export function loadMessages() {
  return dispatch => {
    dispatch({
      type: SIDEBAR_MESSAGES_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('sidebar.messages'),
        get: () => {
          const user = Meteor.user();
          return user ? getSidebarMessages(user).fetch() : [];
        },
      },
    });
  };
}
