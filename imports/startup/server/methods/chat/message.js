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
  
  likeMessage: function (messageId) {
    var user = Meteor.user();
    var message = Messages.findOne(messageId);
    
    if (!user) {
      throw new Meteor.Error('400', 'User not found');
    }
    
    if (!message) {
      throw new Meteor.Error('400', 'Message does not exist');
    }
    
//    if(message.userId != user._id){
//      if(!userHasContact(user, message.userId)){
//        throw new Meteor.Error('401', 'User is not your contact');
//      }
//    }
    
    if (message.likers.includes(user._id)) {
      Messages.update(message._id, {
        $pull: {
          likers: user._id,
        },
        $inc: {
          likes: -1
        }
      });
    } else {
      Messages.update(message._id, {
        $push: {
          likers: user._id,
        },
        $inc: {
          likes: 1
        }
      });
    }
  },
});
