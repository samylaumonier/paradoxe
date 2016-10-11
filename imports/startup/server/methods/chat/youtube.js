import { Meteor } from 'meteor/meteor';

import { Messages } from '/imports/api/collections/messages';

Meteor.methods({
  videoSetWatchTogether: (messageId, videoId, watchTogether) => {
    check(messageId, String);
    check(videoId, String);
    check(watchTogether, Boolean);

    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const message = Messages.findOne(messageId);
    const authorized = message.userId === user._id || message.toUserId.includes(user._id);

    if (!authorized) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const videoIndex = message.videos.findIndex(video => video.id === videoId);

    if (videoIndex > -1) {
      Messages.update(messageId, {
        $set: {
          [`videos.${videoIndex}.watchTogether`]: watchTogether,
        },
      });
    }
  },
});
