import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from '/imports/api/collections/messages';

Meteor.methods({
  readMessage: function (messageId) {
    check(messageId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (!message.toUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    if (!message.read.includes(user._id)) {
      Messages.update(messageId, {
        $push: {
          read: user._id,
        },
      });
    }
  },
  deleteMessage: function (messageId) {
    check(messageId, String);
    
    const user = Meteor.user();
    
    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }
    
    const message = Messages.findOne(messageId);
    
    if (!message) {
      throw new Meteor.Error('404', 'Not found.');
    }
    
    if (message.userId === Meteor.settings.public.bot.id || message.toUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }
    
    Messages.remove(message._id);
  },
});
