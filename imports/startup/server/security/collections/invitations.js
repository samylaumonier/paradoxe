import { Invitations } from '/imports/api/collections/invitations';

Invitations
  .permit(['remove'])
  .ifLoggedIn()
  .ifIsTarget()
  .allowInClientCode();
