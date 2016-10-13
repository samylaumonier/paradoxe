import { Meteor } from 'meteor/meteor';

import { Files } from '/imports/api/collections/files';
import { Posts } from '/imports/api/collections/posts';

Meteor.publish('home.posts', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }

    const user = Meteor.users.findOne(this.userId);

    // Users ids
    let usersIds = [];

    if (user.profile && user.profile.contacts) {
      usersIds = user.profile.contacts;
    }

    usersIds.push(this.userId);

    // Users
    const users = Meteor.users.find({
      _id: {
        $in: usersIds
      },
    }, {
      fields: {
        username: 1,
        'profile.emailHash': 1,
        'profile.pictureId': 1,
      },
    });

    // Posts
    const posts = Posts.find({
      userId: {
        $in: usersIds,
      },
    });

    // Profile pictures
    const files = Files.find({
      _id: {
        $in: _.compact(_.map(users.fetch(), user => user.profile.pictureId)),
      },
    }).cursor;

    return [
      posts,
      users,
      files,
    ];
  });
});

