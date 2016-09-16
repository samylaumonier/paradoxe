import { Meteor } from 'meteor/meteor';

import {
  Messages,
  INCOMING_VIDEO_CALL_TAG,
  OUTGOING_VIDEO_CALL_TAG,
  RINGING_STATUS
} from '/imports/api/collections/messages';

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

          if (user) {
            const ids = user.profile && user.profile.contacts ? user.profile.contacts : null;

            if (ids) {
              return _.union(
                Messages.find({
                  tag: INCOMING_VIDEO_CALL_TAG,
                  status: RINGING_STATUS,
                  $or: [
                    { toUserId: { $in: user.profile.contacts }, contactId: { $in: [user._id] } },
                    { toUserId: { $in: [user._id] }, contactId: { $in: user.profile.contacts } },
                  ],
                }).fetch(),
                Messages.find({
                  tag: OUTGOING_VIDEO_CALL_TAG,
                  status: RINGING_STATUS,
                  $or: [
                    { toUserId: { $in: user.profile.contacts }, contactId: { $in: [user._id] } },
                    { toUserId: { $in: [user._id] }, contactId: { $in: user.profile.contacts } },
                  ],
                }).fetch()
              );
            }
          }

          return [];
        },
      },
    });
  };
}
