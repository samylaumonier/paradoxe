import { Meteor } from 'meteor/meteor';
import { Notifications } from '/imports/api/collections/notifications';

Meteor.publish('navbar.notifications', function () {
  if (!this.userId) {
    return [];
  }

  const user = Meteor.users.findOne(this.userId);
  
  return Notifications.find({
    userId: user._id
  });
  
});
