import { Meteor } from 'meteor/meteor';
import { Notifications } from '/imports/api/collections/notifications';

Meteor.publish('navbar.notifications', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }
  
    const user = Meteor.users.findOne(this.userId);
  
    const notifications = Notifications.find({
      userId: user._id,
      seen: false
    });
  
  
    return [
      notifications,
      Meteor.users.find({
        _id: {
          $in: _.pluck(notifications.fetch(), 'targetId')
        }
      }, {
        fields: {
          username: 1,
          'profile.emailHash': 1
        }
      })
    ]
  });
});
