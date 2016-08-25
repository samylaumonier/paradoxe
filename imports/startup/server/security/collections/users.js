import { Meteor } from 'meteor/meteor';

Security
  .permit(['update'])
  .collections([Meteor.users])
  .onlyProps([
    'profile'
  ])
  .ifLoggedIn()
  .ifIsSelf()
  .allowInClientCode();
