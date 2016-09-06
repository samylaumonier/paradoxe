import { Meteor } from 'meteor/meteor';
import { userHasContact } from '/imports/api/collections/users';
import {
  Messages,
  FILE_UPLOAD_TAG,
  UPLOADING_STATUS
} from '/imports/api/collections/messages';

Meteor.methods({
  uploadFile: function (files, contactId) {
    const user = Meteor.user();
    
    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }
    
    const contact = Meteor.users.findOne(contactId);
  
    if (!contact) {
      throw new Meteor.Error('401', 'Not authorized.');
    }
  
    if(!userHasContact(user, contact._id)){
      throw new Meteor.Error('401', 'Not authorized.');
    }
    
    Messages.insert({
      userId: Meteor.settings.public.bot.id,
      toUserId: [user._id, contact._id],
      contactId: [user._id, contact._id],
      sender: [user._id],
      tag: FILE_UPLOAD_TAG,
      files: files.map(file => {
        file.status = UPLOADING_STATUS;
        return file;
      })
    });
  },
});