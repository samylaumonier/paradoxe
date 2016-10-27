import { Meteor } from 'meteor/meteor';

import { Groups } from '/imports/api/collections/groups';

Meteor.methods({
  createGroup: function ({ name, usernames, pictureId, isPrivate }) {
    check(name, String);
    check(usernames, [String]);
    check(isPrivate, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('401', 'Not authorized');
    }

    if (!usernames.length) {
      throw new Meteor.Error('400', 'Please select at least one contact');
    }

    const user = Meteor.users.findOne(this.userId);
    const users = Meteor.users.find({
      _id: {
        $in: user.profile.contacts,
      },
      username: {
        $in: usernames,
      },
    }, {
      fields: {
        _id: 1,
      }
    }).fetch();

    Groups.insert({
      name,
      users: [this.userId, ..._.pluck(users, '_id')],
      pictureId,
      isPrivate,
    });
  },
});
