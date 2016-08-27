import { Meteor } from 'meteor/meteor';
import { Invitations } from '/imports/api/collections';

Meteor.publish('invites.received', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }
    
    const user = Meteor.users.findOne(this.userId);
    const invitations = Invitations.find({
      targetId: user._id
    });
    
    return [
      invitations,
      Meteor.users.find({
        _id: {
          $in: _.pluck(invitations.fetch(), 'userId')
        }
      }, {
        fields: {
          username: 1,
          'profile.emailHash': 1
        }
      })
    ];
  });
});
