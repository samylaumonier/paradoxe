export const Notifications = new Mongo.Collection('notifications');

export const NotificationsSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
  },
  targetId: {
    type: String,
  },
  tag: {
    type: Number,
  },
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  seen: {
    type: Boolean,
  },
});

Notifications.attachSchema(NotificationsSchema);

export const CONTACT_REQUEST = 1;
export const REQUEST_ACCEPTED = 2;
export const MISSED_CALL = 3;