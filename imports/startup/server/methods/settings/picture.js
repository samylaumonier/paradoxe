import { Meteor } from 'meteor/meteor';

import { Files } from '/imports/api/collections/files';

Meteor.methods({
  setProfilePicture: fileId => {
    check(fileId, String);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    if (user.profile && user.profile.pictureId) {
      Files.remove({
        _id: user.profile.pictureId
      });
    }

    Meteor.users.update(user._id, {
      $set: {
        'profile.pictureId': fileId,
      },
    });
  },
});