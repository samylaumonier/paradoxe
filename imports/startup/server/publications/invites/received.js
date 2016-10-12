import { Meteor } from 'meteor/meteor';

import { Invites } from '/imports/api/collections/invites';
import { Files } from '/imports/api/collections/files';

Meteor.publish('invites.received', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }
    
    const user = Meteor.users.findOne(this.userId);

    // Invites
    const invites = Invites.find({
      targetId: user._id,
    });

    // Users
    const usersIds = _.pluck(invites.fetch(), 'userId');
    const users = Meteor.users.find({
      _id: {
        $in: usersIds,
      },
    }, {
      fields: {
        username: 1,
        'profile.emailHash': 1,
        'profile.pictureId': 1,
      },
    });

    // Profile pictures
    const files = Files.find({
      _id: {
        $in: _.compact(_.map(users.fetch(), user => user.profile.pictureId)),
      },
    }).cursor;

    return [
      invites,
      users,
      files,
    ];
  });
});
