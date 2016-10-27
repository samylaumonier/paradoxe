export const Groups = new Mongo.Collection('groups');

export const GroupSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  users: {
    type: [String],
  },
  isPrivate: {
    type: Boolean,
  },
  pictureId: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
  },
});
