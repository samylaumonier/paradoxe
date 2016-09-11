import { Meteor } from 'meteor/meteor';

export const NAVBAR_INVITES_SUBSCRIPTION = 'NAVBAR_INVITES_PAGE_SUBSCRIPTION';
export const NAVBAR_INVITES_SUBSCRIPTION_READY = 'NAVBAR_INVITES_PAGE_SUBSCRIPTION_READY';
export const NAVBAR_INVITES_SUBSCRIPTION_CHANGED = 'NAVBAR_INVITES_PAGE_SUBSCRIPTION_CHANGED';

export function loadInvites() {
  return dispatch => {
    dispatch({
      type: NAVBAR_INVITES_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('navbar.invites'),
        get: () => Counts.get('navbar.invites'),
      },
    });
  };
}
