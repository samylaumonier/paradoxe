import { Meteor } from 'meteor/meteor';
import youtubeRegex from 'youtube-regex';

import { FileSchema } from './files';

export const Messages = new Mongo.Collection('messages');

export const INCOMING_VIDEO_CALL_TAG = 1;
export const OUTGOING_VIDEO_CALL_TAG = 2;
export const HUNG_UP_VIDEO_CALL_TAG = 3;
export const FILE_UPLOAD_TAG = 4;
export const NUDGE_TAG = 5;

export const RINGING_STATUS = 1;
export const ANSWERED_STATUS = 2;
export const DECLINED_STATUS = 3;
export const CANCELED_STATUS = 4;
export const MISSED_STATUS = 5;
export const ERROR_STATUS = 6;
export const UPLOADING_STATUS = 7;
export const UPLOADED_STATUS = 8;

// In seconds
export const RINGING_DURATION = 30;
export const NUDGE_LIMIT = 15;

const MessageVideoSchema = new SimpleSchema({
  id: {
    type: String,
  },
  watchTogether: {
    type: Boolean,
  },
});

export const MessagesSchema = new SimpleSchema({
//  _id is need when using the schema with a check function, if attaching it to a collection it should be removed
  _id: {
    type: String,
  },
  userId: {
    type: String,
  },
  toUserId: {
    type: [String],
  },
  createdAt: {
    type: Date,
  },
  videos: {
    type: [MessageVideoSchema],
  },
  read: {
    type: [String],
  },
  tag: {
    type: Number,
    optional: true,
  },
  contactId: {
    type: [String],
    optional: true,
  },
  status: {
    type: Number,
    optional: true,
  },
  declined: {
    type: Boolean,
    optional: true,
  },
  missed: {
    type: Boolean,
    optional: true,
  },
  ended: {
    type: Boolean,
    optional: true,
  },
  hungUp: {
    type: Boolean,
    optional: true,
  },
  content: {
    type: String,
    optional: true,
  },
  associatedMessageId: {
    type: String,
    optional: true,
  },
  contactVideoPeerId: {
    type: String,
    optional: true,
  },
  hungUpByUserId: {
    type: String,
    optional: true,
  },
  targetUserId: {
    type: [String],
    optional: true,
  },
  sender: {
    type: [String],
    optional: true,
  },
  files: {
    type: [FileSchema],
    optional: true,
  },
  nudged: {
    type: Boolean,
    optional: true,
  },
});

export function getSidebarMessages(user) {
  const contacts = user.profile && user.profile.contacts ? user.profile.contacts : [];

  return Messages.find({
    $or: [
      // Video call related messages
      {
        tag: {
          $in: [INCOMING_VIDEO_CALL_TAG, OUTGOING_VIDEO_CALL_TAG]
        },
        status: {
          $in: [RINGING_STATUS, ANSWERED_STATUS]
        },
        $or: [
          { toUserId: { $in: contacts }, contactId: { $in: [user._id] } },
          { toUserId: { $in: [user._id] }, contactId: { $in: contacts } },
        ],
      },
      // Unread messages
      {
        read: {
          $nin: [user._id],
        },
        toUserId: {
          $in: [user._id],
        },
        $or: [
          { userId: { $in: contacts } },
          { contactId: { $in: contacts } },
        ]
      },
      // Nudge messages
      {
        tag: NUDGE_TAG,
        sender: { $in: contacts },
        targetUserId: { $in: [user._id] },
        nudged: false,
      },
    ],
  });
}

export function shouldMarkMessageAsRead(message) {
  const user = Meteor.user();
  return message.toUserId.includes(user._id) && !message.read.includes(user._id);
}

// Videos
const videosRegex = new RegExp(youtubeRegex());

export function getVideosIds(message) {
  const videosIds = [];
  let match;

  do {
    match = videosRegex.exec(message.content);

    if (match) {
      videosIds.push(match[1]);
    }
  } while (match);

  return _.uniq(videosIds);
}
