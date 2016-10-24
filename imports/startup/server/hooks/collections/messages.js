import escape from 'escape-html';
import { Messages, MessagesSchema, getVideosIds } from '/imports/api/collections/messages';

Messages.before.insert(function (userId, doc) {
  doc.userId = doc.userId || userId;
  doc.createdAt = new Date();
  doc.read = [];
  doc.likers = [];
  doc.likes = 0;

  // Videos
  doc.videos = getVideosIds(doc);

  // Escape HTML
  if (doc.content) {
    doc.content = escape(doc.content);
  }

  check(doc, MessagesSchema);
});
