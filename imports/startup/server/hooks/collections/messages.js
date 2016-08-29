import { Messages } from '/imports/api/collections/messages'

Messages.before.insert(function (userId, doc) {
  doc.userId = doc.userId || userId;
  doc.createdAt = new Date();
});
