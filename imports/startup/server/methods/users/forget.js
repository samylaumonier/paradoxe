import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  forget: function (email) {
    const user = Meteor.users.findOne({"emails.0.address": email});
    
    if (user){
      Accounts.sendResetPasswordEmail(user._id);
    }else {
      throw new Meteor.Error('404', 'User not found.');
    }
    
  },
});
