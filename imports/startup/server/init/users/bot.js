import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  const user = Meteor.users.findOne({
    username: Meteor.settings.bot.username
  });

  if (!user) {
    Accounts.createUser({
      username: Meteor.settings.bot.username,
      email: Meteor.settings.bot.email,
      password: Random.secret(100),
    });
  }
});
