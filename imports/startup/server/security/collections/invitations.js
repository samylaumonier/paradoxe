import { Invites } from '/imports/api/collections/invites';

Invites
  .permit(['remove'])
  .ifLoggedIn()
  .ifIsTarget()
  .allowInClientCode();
