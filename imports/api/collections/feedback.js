export const Feedbacks = new Mongo.Collection('feedbacks');

export const FeedbacksSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
  },
  subject: {
    type: String,
  },
  type: {
    type: String,
  },
  imageId: {
    type: String,
    optional: false,
  },
  createdAt: {
    type: Date,
  },
});

