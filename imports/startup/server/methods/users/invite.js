import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Invites } from '/imports/api/collections/invites';

Meteor.methods({
  inviteUsers: function (usernames) {
    check(usernames, [String]);

    if (!this.userId) {
      throw new Meteor.Error('401', 'Not authorized');
    }

    if (!usernames.length) {
      throw new Meteor.Error('400', 'Please select at least one contact');
    }

    // Exclude user and his contacts
    const user = Meteor.users.findOne(this.userId);
    const excludedIds = user.profile && user.profile.contacts ? user.profile.contacts : [];

    excludedIds.push(Meteor.settings.public.bot.id);
    excludedIds.push(this.userId);

    // Find users to invite
    const targets = Meteor.users.find({
      _id: {
        $nin: excludedIds
      },
      username: {
        $in: usernames
      }
    }, {
      _id: 1
    });

    const targetIds = _.pluck(targets.fetch(), '_id');

    targetIds.forEach(targetId => {
      Invites.upsert({
        userId: this.userId,
        targetId
      }, {
        $set: {
          sentAt: new Date()
        }
      });
    });

    return targetIds.length;
  }
});
