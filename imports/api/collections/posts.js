export const Posts = new Mongo.Collection('posts');

export const PostsSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
  },
  content: {
    type: String,
  },
  likers: {
    type: [String],
    optional: false,
  },
  likes: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});
