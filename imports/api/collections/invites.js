export const Invites = new Mongo.Collection('invites');

InvitesSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
  },
  targetId: {
    type: String,
  },
  sentAt: {
    type: Date,
  },
});

Invites.attachSchema(InvitesSchema);
