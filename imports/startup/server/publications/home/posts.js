import { Meteor } from 'meteor/meteor';
import { Posts } from '/imports/api/collections'

Meteor.publish('home.posts', function () {
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

    return [
      Posts.find({
        userId: {
          $in: ids
        }
      }),
      Meteor.users.find({
        _id: {
          $in: ids
        }
      }, {
        fields: {
          username: 1
        }
      })
    ];
  });
});

