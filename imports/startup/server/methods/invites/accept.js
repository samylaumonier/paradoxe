import { Meteor } from 'meteor/meteor';
import { Invites } from '/imports/api/collections/invites';
import { Notifications, REQUEST_ACCEPTED } from '/imports/api/collections/notifications';

Meteor.methods({
  acceptInvitation: function (invitesId) {
    const user = Meteor.user();
    const invite = Invites.findOne(invitesId);

    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    if (!invite) {
      throw new Meteor.Error('404', 'Invite not found.');
    }

    const invertedInvite = Invites.findOne({
      userId: user._id,
      targetId: invite.userId
    });

    if (invertedInvite) {
      Invites.remove(invertedInvite._id);
    }

    Meteor.users.update(invite.targetId, {
      $push: {
        'profile.contacts': invite.userId
      }
    });

    Meteor.users.update(invite.userId, {
      $push: {
        'profile.contacts': invite.targetId
      }
    });
    
    const invitedUser = Meteor.users.findOne(invite.targetId);

    const notification = {
      userId: invite.userId,
      targetId: invite.targetId,
      tag: REQUEST_ACCEPTED,
      url: '/chat/' + invitedUser.username,
      createdAt: new Date(),
      seen: false
    };

    Notifications.insert(notification);
  },
});
