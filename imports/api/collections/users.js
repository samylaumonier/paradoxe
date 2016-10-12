import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

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
    throw new Error('Required field not found!');
  }
}

export function findUserByLoginToken(userId, loginToken, options = {}) {
  return Meteor.users.findOne({
    _id: userId,
    'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(loginToken)
  }, options);
}
