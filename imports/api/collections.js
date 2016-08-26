export const Invitations = new Mongo.Collection('invitations');
export const Messages = new Mongo.Collection('messages');
export const Posts = new Mongo.Collection('posts');

export const userHasContact = function (user, contactId) {
  return user.profile && user.profile.contacts && user.profile.contacts.includes(contactId);
};
