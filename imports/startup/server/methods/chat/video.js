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
      toUserId: [user._id],
      tag: OUTGOING_VIDEO_CALL_TAG,
      contactId: [contactId],
      status: RINGING_STATUS,
      declined: false,
      missed: false,
      ended: false,
    });

    const incomingMessageId = Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: [contact._id],
      tag: INCOMING_VIDEO_CALL_TAG,
      contactId: [user._id],
      contactVideoPeerId: userVideoPeerId,
      status: RINGING_STATUS,
      associatedMessageId: outgoingMessageId,
      ended: false,
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

    if (incomingMessage.userId !== Meteor.settings.public.bot.id || !incomingMessage.toUserId.includes(user._id)) {
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
  updateVideoCallStatusHungUp: function (messageId) {
    check(messageId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const incomingMessage = Messages.findOne(messageId);

    if (!incomingMessage) {
      throw new Meteor.Error('404', 'Not found.');
    }

    const authorized = incomingMessage.toUserId.includes(user._id) || incomingMessage.contactId.includes(user._id);

    if (incomingMessage.userId !== Meteor.settings.public.bot.id || !authorized) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    setCallEnded([incomingMessage._id, incomingMessage.associatedMessageId]);

    Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: _.union(incomingMessage.toUserId, incomingMessage.contactId),
      contactId: _.union(incomingMessage.toUserId, incomingMessage.contactId),
      tag: HUNG_UP_VIDEO_CALL_TAG,
      hungUpByUserId: user._id,
      targetUserId: incomingMessage.toUserId.includes(user._id)
        ? incomingMessage.contactId
        : incomingMessage.toUserId,
      hungUp: false,
    });
  },
  updateVideoCallStatusConnectionLost: function (messageId) {
    check(messageId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const incomingMessage = Messages.findOne(messageId);

    if (!incomingMessage) {
      throw new Meteor.Error('404', 'Not found.');
    }

    const authorized = incomingMessage.toUserId.includes(user._id) || incomingMessage.contactId.includes(user._id);

    if (incomingMessage.userId !== Meteor.settings.public.bot.id || !authorized) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    setCallEnded([incomingMessage._id, incomingMessage.associatedMessageId]);

    Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: _.union(incomingMessage.toUserId, incomingMessage.contactId),
      contactId: _.union(incomingMessage.toUserId, incomingMessage.contactId),
      content: 'Connection lost',
    });
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

    if (outgoingMessage.userId !== Meteor.settings.public.bot.id || !outgoingMessage.toUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    Messages.update(outgoingMessage._id, {
      $set: {
        declined: true
      }
    });
  },
  setVideoCallMissed: function (messageId) {
    check(messageId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const outgoingMessage = Messages.findOne(messageId);

    if (!outgoingMessage) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (outgoingMessage.userId !== Meteor.settings.public.bot.id || !outgoingMessage.toUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    Messages.update(outgoingMessage._id, {
      $set: {
        missed: true
      }
    });
  },
  setVideoCallHungUp: function (messageId) {
    check(messageId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (message.userId !== Meteor.settings.public.bot.id || !message.targetUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    Messages.update(message._id, {
      $set: {
        hungUp: true
      }
    });
  },
});

function setCallEnded(ids) {
  ids.forEach(id => {
    Messages.update(id, {
      $set: {
        ended: true
      }
    });
  });
}
