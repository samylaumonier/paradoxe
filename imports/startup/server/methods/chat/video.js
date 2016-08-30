import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {
  Messages,
  INCOMING_VIDEO_CALL_TAG,
  OUTGOING_VIDEO_CALL_TAG,
  HUNG_UP_VIDEO_CALL_TAG,
  MISSED_STATUS,
  RINGING_STATUS,
  RINGING_DURATION
} from '/imports/api/collections/messages';
import { userHasContact, userHasBlockedContact } from '/imports/api/collections/users';

Meteor.methods({
  startVideoCall: function (userVideoPeerId, contactId) {
    check(userVideoPeerId, String);
    check(contactId, String);

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

    const outgoingMessageId = Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: user._id,
      tag: OUTGOING_VIDEO_CALL_TAG,
      contactId,
      status: RINGING_STATUS,
      declined: false,
    });

    const incomingMessageId = Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: contact._id,
      tag: INCOMING_VIDEO_CALL_TAG,
      callerId: user._id,
      callerVideoPeerId: userVideoPeerId,
      status: RINGING_STATUS,
      associatedMessageId: outgoingMessageId,
    });

    Messages.update(outgoingMessageId, {
      $set: {
        associatedMessageId: incomingMessageId,
      }
    });

    setTimeout(Meteor.bindEnvironment(() => {
      const messages = Messages.find({
        _id: {
          $in: [
            incomingMessageId,
            outgoingMessageId,
          ],
        },
      });

      messages.forEach(message => {
        if (message.status === RINGING_STATUS) {
          Messages.update(message._id, {
            $set: {
              status: MISSED_STATUS,
            },
          });
        }
      });
    }), RINGING_DURATION * 1000);

    return incomingMessageId;
  },
  updateVideoCallStatus: function (messageId, status) {
    check(messageId, String);
    check(status, Number);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const incomingMessage = Messages.findOne(messageId);

    if (!incomingMessage) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (incomingMessage.userId !== Meteor.settings.public.bot.id || incomingMessage.toUserId !== user._id) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    Messages.update(messageId, {
      $set: {
        status
      }
    });

    const outgoingMessage = Messages.findOne(incomingMessage.associatedMessageId);

    if (outgoingMessage) {
      Messages.update(outgoingMessage._id, {
        $set: {
          status
        }
      });
    }
  },
  setVideoCallDeclined: function (messageId) {
    check(messageId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const outgoingMessage = Messages.findOne(messageId);

    if (!outgoingMessage) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (outgoingMessage.userId !== Meteor.settings.public.bot.id || outgoingMessage.toUserId !== user._id) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    Messages.update(outgoingMessage._id, {
      $set: {
        declined: true
      }
    });
  },
  setVideoCallHunUp: function (messageId) {
    check(messageId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const incomingMessage = Messages.findOne(messageId);

    if (!incomingMessage) {
      throw new Meteor.Error('404', 'Not found.');
    }

    const authorized = incomingMessage.toUserId === user._id || incomingMessage.callerId === user._id;

    if (incomingMessage.userId !== Meteor.settings.public.bot.id || !authorized) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: [
        incomingMessage.toUserId,
        incomingMessage.callerId,
      ],
      tag: HUNG_UP_VIDEO_CALL_TAG,
      hungUp: false,
    });
  },
});
