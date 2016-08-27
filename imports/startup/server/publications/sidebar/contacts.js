import { Meteor } from 'meteor/meteor';

Meteor.publish('sidebar.contacts', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }

    const user = Meteor.users.findOne(this.userId);
    let ids = [];

    if (user.profile && user.profile.contacts) {
      ids = user.profile.contacts;
    }

    ids.push(this.userId);

    return Meteor.users.find({
      _id: {
        $in: ids
      }
    }, {
      fields: {
        username: 1,
        'profile.emailHash': 1,
        'status.online': 1,
        'status.idle': 1
      }
    });
  });
});
