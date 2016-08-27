import { Meteor } from 'meteor/meteor';
import { Messages, userHasContact } from '/imports/api/collections';

Meteor.publish('chat.messages', function (contactUsername) {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }

    const user = Meteor.users.findOne(this.userId);
    const contact = Meteor.users.findOne({
      username: contactUsername
    });

    if (contact && userHasContact(user, contact._id)) {
      return [
        Meteor.users.find(contact._id, {
          fields: {
            username: 1,
            'profile.emailHash': 1
          }
        }),
        Messages.find({
          $or: [
            { userId: user._id, toUserId: contact._id },
            { userId: contact._id, toUserId: user._id },
          ]
        }, {
          sort: {
            sentAt: -1
          },
          limit: 500
        })
      ];
    }

    return [];
  });
});
