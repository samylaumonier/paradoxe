import { Meteor } from 'meteor/meteor';
import { Messages } from '/imports/api/collections/messages';
import { userHasContact } from '/imports/api/collections/users';
import { Files } from '/imports/api/collections/files';

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
        Meteor.users.find({
          _id: {
            $in: [
              contact._id,
              Meteor.settings.public.bot.id
            ]
          }
        }, {
          fields: {
            username: 1,
            'profile.emailHash': 1
          }
        }),
        Messages.find({
          $or: [
            { userId: user._id, toUserId: { $in: [contact._id] } },
            { userId: contact._id, toUserId: { $in: [user._id] } },
            { userId: Meteor.settings.public.bot.id, toUserId: { $in: [user._id] }, contactId: { $in: [contact._id] } },
          ]
        }, {
          sort: {
            sentAt: -1
          },
          limit: 500
        }),
        Files.find({
          $or: [
            { userId: user._id, 'meta.contactId': { $in: [contact._id] }},
            { userId: contact._id, 'meta.contactId': { $in: [user._id] }},
          ]
        }).cursor,
      ];
    }

    return [];
  });
});
