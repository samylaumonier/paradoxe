import { Meteor } from 'meteor/meteor';
import { Notifications } from '/imports/api/collections/notifications';

Meteor.methods({
  notificationSeen: function (notificationId) {
    var user = Meteor.user();
    var notification = Notifications.findOne(notificationId);
  
    if (!user) {
      throw new Meteor.Error('400', 'User not found');
    }
  
    if (!notification) {
      throw new Meteor.Error('400', 'Notification does not exist');
    }
    
    Notifications.update(notification._id, {
      $set: {
        seen: true
      }
    })
  },
  seeAllNotifications: function(){
    var user = Meteor.user();
    
    if (!user) {
      throw new Meteor.Error('400', 'User not found');
    }
    
    var notificationList = Notifications.find({userId: user._id});
    notificationList.forEach(
      function (notification) {
        if (notification.seen == false) {
          Notifications.update(notification._id,{
            $set:{
              seen: true
            }
          });
        }
      }
    );
  }
  
});
