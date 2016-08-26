import { Posts } from '/imports/api/collections'

Posts.before.insert(function (userId, doc) {
  doc.userId = userId;
  doc.createdAt = new Date();
});
