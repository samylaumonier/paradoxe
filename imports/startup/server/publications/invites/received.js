import { Meteor } from 'meteor/meteor';
import { Invitations } from '/imports/api/collections';

Meteor.publish('invites.received', function () {
  if (!this.userId) {
    return [];
  }
  
  const user = Meteor.users.findOne(this.userId);
  
  return Invitations.find({
    targetId: user._id
  });
});
