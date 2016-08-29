import { Meteor } from 'meteor/meteor';
import { Invitations } from '/imports/api/collections/invitations';

Meteor.publish('navbar.invites', function () {
  if (!this.userId) {
    return [];
  }

  const user = Meteor.users.findOne(this.userId);

  Counts.publish(this, 'navbar.invites', Invitations.find({
    targetId: user._id
  }));
});
