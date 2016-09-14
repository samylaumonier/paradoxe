import { userHasContact } from '/imports/api/collections/users';

Security.defineMethod('ifHasContact', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    if (!userId){
      return false;
    }
    const user = Meteor.user();
    
    return doc[arg.contactIdField].every( contactId => {
      return userHasContact(user, contactId);
    });
  },
});
