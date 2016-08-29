import { Meteor } from 'meteor/meteor';
import { userHasContact } from '/imports/api/collections/users';

Meteor.methods({
  unblockContact: function (contactId) {
    const user = Meteor.user();

    if (!user || !userHasContact(user, contactId)) {
      throw new Meteor.Error('401', 'Not authorized.');
    }

    const contact = Meteor.users.findOne(contactId);

    if (!contact) {
      throw new Meteor.Error('404', 'Contact not found.');
    }
    
    Meteor.users.update(user._id, {
      $pull: {
        'profile.blockedContacts': contactId
      }
    });
  },
});
