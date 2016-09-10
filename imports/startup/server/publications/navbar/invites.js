import { Meteor } from 'meteor/meteor';
import { Invites } from '/imports/api/collections/invites';

Meteor.publish('navbar.invites', function () {
  if (!this.userId) {
    return [];
  }

  const user = Meteor.users.findOne(this.userId);

  Counts.publish(this, 'navbar.invites', Invites.find({
    targetId: user._id
  }));
});
