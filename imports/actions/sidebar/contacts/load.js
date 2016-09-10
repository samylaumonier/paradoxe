import { Meteor } from 'meteor/meteor';

export const CONTACTS_SUBSCRIPTION = 'CONTACTS_SUBSCRIPTION';
export const CONTACTS_SUBSCRIPTION_READY = 'CONTACTS_SUBSCRIPTION_READY';
export const CONTACTS_SUBSCRIPTION_CHANGED = 'CONTACTS_SUBSCRIPTION_CHANGED';

export function loadContacts() {
  return dispatch => {
    dispatch({
      type: CONTACTS_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('sidebar.contacts'),
        get: () => {
          const user = Meteor.user();

          if (user) {
            const ids = user.profile ? user.profile.contacts : null;

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
