import slugify from 'underscore.string/slugify';

import { Groups, GroupSchema } from '/imports/api/collections/groups';

Groups.before.insert(function (userId, doc) {
  doc.userId = userId;
  doc.createdAt = new Date();
  doc.name = doc.name.trim();
  doc.slug = slugify(doc.name);

  check(doc, GroupSchema);
});
