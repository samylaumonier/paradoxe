export const Invitations = new Mongo.Collection('invitations');
export const Messages = new Mongo.Collection('messages');
export const Posts = new Mongo.Collection('posts');

export const getUserStatus = function (status) {
  if (!status) {
    return 'gray';
  } else if (status.idle) {
    return 'orange';
  } else if (status.online) {
    return 'green';
  } else {
    return 'gray';
  }
};

export const userHasContact = function (user, contactId) {
  checkRequiredField(user, 'contacts');
  return user.profile.contacts.includes(contactId);
};

export const userHasBlockedContact = function (user, contactId) {
  checkRequiredField(user, 'blockedContacts');
  return user.profile.blockedContacts.includes(contactId);
};

function checkRequiredField(user, field) {
  if (!user.profile || !user.profile[field]) {
    console.log(user);
    throw new Error('Required field not found!');
  }
}
