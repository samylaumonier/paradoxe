import { Meteor } from 'meteor/meteor';
import { Messages } from '/imports/api/collections/messages';
import { userHasContact, userHasBlockedContact } from '/imports/api/collections/users';
import { INCOMING_VIDEO_CALL, OUTGOING_VIDEO_CALL } from '/imports/api/collections/messages';

Meteor.methods({
  startVideoCall: function (userVideoPeerId, contactId) {
    const user = Meteor.user();

    if (!user || !userHasContact(user, contactId)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const contact = Meteor.users.findOne(contactId);

    if (!contact) {
      throw new Meteor.Error('404', 'Contact not found.');
    }

    if (!contact.status.online || userHasBlockedContact(contact, user._id)) {
      throw new Meteor.Error('400', 'Contact is offline.');
    }

    Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: contact._id,
      tag: INCOMING_VIDEO_CALL,
      callerId: user._id,
      callerVideoPeerId: userVideoPeerId
    });

    Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: user._id,
      tag: OUTGOING_VIDEO_CALL,
      contactId
    });
  }
});
