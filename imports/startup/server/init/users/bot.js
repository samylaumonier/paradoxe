import md5 from 'md5';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  const user = Meteor.users.findOne(Meteor.settings.public.bot.id);

  if (!user) {
    Meteor.users.insert({
      _id: Meteor.settings.public.bot.id,
      username: Meteor.settings.bot.username,
      emails: [
        { address: Meteor.settings.bot.email, verified: true }
      ],
      password: Random.secret(100),
      profile: {
        contacts: [],
        blockedContacts: [],
        emailHash: md5(Meteor.settings.bot.email),
        pictureId: null,
        lastNudgeSentAt: {},
        sockets: [],
      }
    });
  }
});
