import { Meteor } from 'meteor/meteor';
import { Invitations } from '/imports/api/collections/invitations';

Meteor.methods({
  acceptInvitation: function (invitationsId) {
    const user = Meteor.user();
    const invitation = Invitations.findOne(invitationsId);

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    if (!invitation) {
      throw new Meteor.Error('404', 'Invitation not found.');
    }

    const invertedInvite = Invitations.findOne({
      userId: user._id,
      targetId: invitation.userId
    });

    if (invertedInvite) {
      Invitations.remove(invertedInvite._id);
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
