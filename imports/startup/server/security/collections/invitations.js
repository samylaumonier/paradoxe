import { Invitations } from '/imports/api/collections';

Invitations
  .permit(['remove'])
  .ifLoggedIn()
  .ifIsTarget()
  .allowInClientCode();
