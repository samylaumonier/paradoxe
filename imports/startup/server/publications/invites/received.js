import { Meteor } from 'meteor/meteor';
import { Invites } from '/imports/api/collections/invites';

Meteor.publish('invites.received', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }
    
    const user = Meteor.users.findOne(this.userId);
    const invites = Invites.find({
      targetId: user._id,
    });
    
    return [
      invites,
      Meteor.users.find({
        _id: {
          $in: _.pluck(invites.fetch(), 'userId')
        }
      }, {
        fields: {
          username: 1,
          'profile.emailHash': 1
        }
      }),
    ];
  });
});
