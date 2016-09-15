import { Meteor } from 'meteor/meteor';

import { userHasContact } from '/imports/api/collections/users';
import { Files } from '/imports/api/collections/files';
import {
  Messages,
  FILE_UPLOAD_TAG,
  UPLOADING_STATUS
} from '/imports/api/collections/messages';

Meteor.methods({
  uploadFile: function (files, contactId) {
    check(files, Array);
    check(contactId, String);

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
      }),
    });
  },
  updateFileStatus: function (messageId, fileInfoId, status, fileId = null) {
    check(messageId, String);
    check(fileInfoId, String);
    check(status, Number);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (message.userId !== Meteor.settings.public.bot.id || !message.toUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const index = message.files.findIndex(file => file.id === fileInfoId);

    if (index > -1) {
      const values = {
        [`files.${index}.status`]: status,
      };

      if (fileId) {
        values[`files.${index}.fileId`] = fileId;
      }

      Messages.update(messageId, {
        $set: values,
      });
    }
  },
  updateFileProgress: function (messageId, fileInfoId, progress) {
    check(messageId, String);
    check(fileInfoId, String);
    check(progress, Number);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (message.userId !== Meteor.settings.public.bot.id || !message.toUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const index = message.files.findIndex(file => file.id === fileInfoId);

    if (index > -1) {
      Messages.update(messageId, {
        $set: {
          [`files.${index}.progress`]: progress,
        },
      });
    }
  },
  deleteFile: function (messageId, fileId) {
    check(messageId, String);
    check(fileId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error('404', 'Not found.');
    }

    if (message.userId !== Meteor.settings.public.bot.id || !message.toUserId.includes(user._id)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const fileInfo = _.findWhere(message.files, {
      id: fileId
    });

    if (fileInfo && fileInfo.fileId) {
      Files.remove(fileInfo.fileId);
    }

    if (message.files.length === 1) {
      Messages.remove(message._id);
    } else {
      Messages.update(messageId, {
        $pull: {
          files: {
            id: fileId,
          },
        }
      });
    }
  },
});