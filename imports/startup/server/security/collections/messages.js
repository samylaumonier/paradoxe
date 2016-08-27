import { Messages } from '/imports/api/collections';

Messages
  .permit(['insert'])
  .onlyProps([
    'content',
    'toUserId'
  ])
  .ifLoggedIn()
  .ifHasContact({
    contactIdField: 'toUserId'
  })
  .allowInClientCode();
