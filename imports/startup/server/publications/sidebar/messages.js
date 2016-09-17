import { Meteor } from 'meteor/meteor';

import { getSidebarMessages } from '/imports/api/collections/messages';

Meteor.publish('sidebar.messages', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }

    const user = Meteor.users.findOne(this.userId);
    return getSidebarMessages(user);
  });
});
