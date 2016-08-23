import { Meteor } from 'meteor/meteor';

Meteor.publish('sidebar.contacts', function () {
  if (!this.userId) {
    return [];
  }

  const user = Meteor.users.findOne(this.userId);
  let ids = null;

  if (user.profile && user.profile.contacts) {
    ids = user.profile.contacts;
  }

  if (!ids) {
    return [];
  }

  return Meteor.users.find({
    _id: {
      $in: ids
    }
  }, {
    fields: {
      username: 1
    }
  });
});
