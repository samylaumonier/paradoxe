import escape from 'escape-html';
import { Messages, MessagesSchema } from '/imports/api/collections/messages';

Messages.before.insert(function (userId, doc) {
  doc.userId = doc.userId || userId;
  doc.createdAt = new Date();
  doc.read = [];

  if (doc.content) {
    doc.content = escape(doc.content);
  }

  check(doc, MessagesSchema);
});
