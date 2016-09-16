import { Meteor } from 'meteor/meteor';

export const SIDEBAR_CONTACTS_SUBSCRIPTION = 'SIDEBAR_CONTACTS_SUBSCRIPTION';
export const SIDEBAR_CONTACTS_SUBSCRIPTION_READY = 'SIDEBAR_CONTACTS_SUBSCRIPTION_READY';
export const SIDEBAR_CONTACTS_SUBSCRIPTION_CHANGED = 'SIDEBAR_CONTACTS_SUBSCRIPTION_CHANGED';

export function loadContacts() {
  return dispatch => {
    dispatch({
      type: SIDEBAR_CONTACTS_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('sidebar.contacts'),
        get: () => {
          const user = Meteor.user();

          if (user) {
            const ids = user.profile && user.profile.contacts ? user.profile.contacts : null;

            if (ids) {
              return Meteor.users.find({
                _id: {
                  $in: ids
                }
              }).fetch();
            }
          }

          return [];
        },
      },
    });
  };
}
