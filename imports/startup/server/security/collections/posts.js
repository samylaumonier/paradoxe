import { Posts } from '/imports/api/collections';

Posts
  .permit(['insert'])
  .onlyProps([
    'content'
  ])
  .ifLoggedIn()
  .allowInClientCode();

Posts
  .permit(['remove'])
  .ifLoggedIn()
  .ifIsOwner()
  .allowInClientCode();
