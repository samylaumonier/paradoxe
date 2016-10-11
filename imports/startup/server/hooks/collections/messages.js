import escape from 'escape-html';
import { Messages, MessagesSchema, getVideosIds } from '/imports/api/collections/messages';

Messages.before.insert(function (userId, doc) {
  doc.userId = doc.userId || userId;
  doc.createdAt = new Date();
  doc.read = [];

  // Videos
  doc.videos = getVideosIds(doc).map(id => ({
    id,
    watchTogether: false,
  }));

  // Escape HTML
  if (doc.content) {
    doc.content = escape(doc.content);
  }

  check(doc, MessagesSchema);
});
