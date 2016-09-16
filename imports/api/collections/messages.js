import { FileSchema } from './files';

export const Messages = new Mongo.Collection('messages');

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
});

export const INCOMING_VIDEO_CALL_TAG = 1;
export const OUTGOING_VIDEO_CALL_TAG = 2;
export const HUNG_UP_VIDEO_CALL_TAG = 3;
export const FILE_UPLOAD_TAG = 4;

export const RINGING_STATUS = 1;
export const ANSWERED_STATUS = 2;
export const DECLINED_STATUS = 3;
export const CANCELED_STATUS = 4;
export const MISSED_STATUS = 5;
export const ERROR_STATUS = 6;
export const UPLOADING_STATUS = 7;
export const UPLOADED_STATUS = 8;

export const RINGING_DURATION = 30;
