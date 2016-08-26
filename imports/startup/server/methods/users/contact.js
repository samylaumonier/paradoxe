import { Meteor } from 'meteor/meteor';
import { Invitations } from '/imports/api/collections';

Meteor.methods({
  acceptContact: function (invitationsId) {
    const user = Meteor.user();
    const invitation = Invitations.findOne(invitationsId);

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    if (!invitation) {
      throw new Meteor.Error('404', 'Invitation not found.');
    }

    Meteor.users.update(invitation.targetId, {
      $push: {
        'profile.contacts': invitation.userId
      }
    });

    Meteor.users.update(invitation.userId, {
      $push: {
        'profile.contacts': invitation.targetId
      }
    });
  },
});
