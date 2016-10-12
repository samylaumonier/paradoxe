import { Meteor } from 'meteor/meteor';

import { Files } from '/imports/api/collections/files';
import { Notifications } from '/imports/api/collections/notifications';

Meteor.publish('navbar.notifications', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }
  
    const user = Meteor.users.findOne(this.userId);

    // Notifications
    const notifications = Notifications.find({
      userId: user._id,
      seen: false,
    });

    // Users
    const usersIds = _.pluck(notifications.fetch(), 'targetId');
    const users = Meteor.users.find({
      _id: {
        $in: usersIds
      }
    }, {
      fields: {
        username: 1,
        'profile.emailHash': 1,
        'profile.pictureId': 1,
      }
    });

    // Profile pictures
    const files = Files.find({
      _id: {
        $in: _.compact(_.map(users.fetch(), user => user.profile.pictureId)),
      },
    }).cursor;

    return [
      notifications,
      users,
      files,
    ]
  });
});
