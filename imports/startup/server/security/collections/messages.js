import { Messages } from '/imports/api/collections/messages';

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
