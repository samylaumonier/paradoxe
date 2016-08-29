import { Posts } from '/imports/api/collections/posts';

Posts.before.insert(function (userId, doc) {
  doc.userId = userId;
  doc.likers = [];
  doc.likes = 0;
  doc.createdAt = new Date();
});
