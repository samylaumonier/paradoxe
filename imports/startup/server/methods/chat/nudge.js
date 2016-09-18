import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages, NUDGE_TAG, NUDGE_LIMIT } from '/imports/api/collections/messages';
import { userHasContact, userHasBlockedContact } from '/imports/api/collections/users';

Meteor.methods({
  sendNudge: function (contactId) {
    check(contactId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const contact = Meteor.users.findOne(contactId);

    if (!contact) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (!userHasContact(user, contactId)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    if (!contact.status.online || userHasBlockedContact(contact, user._id)) {
      throw new Meteor.Error('400', 'Contact offline.');
    }

    if (user.profile.lastNudgeSentAt[contactId]) {
      const limit = moment().subtract(NUDGE_LIMIT, 'seconds').toDate();

      if (user.profile.lastNudgeSentAt[contactId] > limit) {
        throw new Meteor.Error('400', 'Please slow down.');
      }
    }

    Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: [user._id, contactId],
      tag: NUDGE_TAG,
      contactId: [user._id, contactId],
      sender: [user._id],
      targetUserId: [contactId],
      nudged: false,
    });

    Meteor.users.update(user._id, {
      $set: {
        [`profile.lastNudgeSentAt.${contactId}`]: new Date(),
      },
    });
  },
  userNudged: function (nudgeMessagesIds) {
    check(nudgeMessagesIds, [String]);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    nudgeMessagesIds.forEach(nudgeMessagesId => {
      const message = Messages.findOne(nudgeMessagesId);

      if (!message.targetUserId.includes(user._id) || !userHasContact(user, message.sender[0])) {
        throw new Meteor.Error('401', 'Not authorized.');
      }

      Messages.update(nudgeMessagesId, {
        $set: {
          nudged: true,
        },
      });
    });
  }
});
