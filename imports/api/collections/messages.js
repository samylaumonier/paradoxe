export const Messages = new Mongo.Collection('messages');

export const INCOMING_VIDEO_CALL_TAG = 1;
export const OUTGOING_VIDEO_CALL_TAG = 2;
export const HUNG_UP_VIDEO_CALL_TAG = 3;

export const RINGING_STATUS = 1;
export const ANSWERED_STATUS = 2;
export const DECLINED_STATUS = 3;
export const CANCELED_STATUS = 4;
export const MISSED_STATUS = 5;
export const HUNG_UP_STATUS = 6;
export const ERROR_STATUS = 7;

export const RINGING_DURATION = 30;
