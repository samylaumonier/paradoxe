import { Messages } from '/imports/api/collections'

Messages.before.insert(function (userId, doc) {
  doc.userId = userId;
  doc.createdAt = new Date();
});
