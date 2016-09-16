import { Meteor } from 'meteor/meteor';

import {
  Messages,
  INCOMING_VIDEO_CALL_TAG,
  OUTGOING_VIDEO_CALL_TAG,
  RINGING_STATUS,
  ANSWERED_STATUS
} from '/imports/api/collections/messages';

Meteor.publish('sidebar.messages', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }

    const user = Meteor.users.findOne(this.userId);

    return Messages.find({
      tag: {
        $in: [INCOMING_VIDEO_CALL_TAG, OUTGOING_VIDEO_CALL_TAG]
      },
      status: {
        $in: [RINGING_STATUS, ANSWERED_STATUS]
      },
      $or: [
        { toUserId: { $in: user.profile.contacts }, contactId: { $in: [user._id] } },
        { toUserId: { $in: [user._id] }, contactId: { $in: user.profile.contacts } },
      ],
    });
  });
});
