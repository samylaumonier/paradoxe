import escape from 'escape-html';
import { Feedbacks, FeedbacksSchema } from '/imports/api/collections/feedback';

Feedbacks.before.insert(function (userId, doc) {
  doc.userId = doc.userId || userId;
  doc.createdAt = new Date();
  
  doc.subject = escape(doc.subject);
  doc.type = escape(doc.type);
  
  doc.description = escape(doc.description);
  
  
  check(doc, FeedbacksSchema);
});

