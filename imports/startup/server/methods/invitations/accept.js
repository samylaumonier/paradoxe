import { Meteor } from 'meteor/meteor';
import { Invitations } from '/imports/api/collections/invitations';
import { Notifications, REQUEST_ACCEPTED } from '/imports/api/collections/notifications';

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

    const notification = {
      userId: invitation.userId,
      targetId: invitation.targetId,
      tag: REQUEST_ACCEPTED,
      createdAt: new Date()
    };

    Notifications.insert(notification);
  },
});