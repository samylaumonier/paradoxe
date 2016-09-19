import { Meteor } from 'meteor/meteor';

import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';

export const SIDEBAR_CONTACTS_SUBSCRIPTION = 'SIDEBAR_CONTACTS_SUBSCRIPTION';
export const SIDEBAR_CONTACTS_SUBSCRIPTION_READY = 'SIDEBAR_CONTACTS_SUBSCRIPTION_READY';
export const SIDEBAR_CONTACTS_SUBSCRIPTION_CHANGED = 'SIDEBAR_CONTACTS_SUBSCRIPTION_CHANGED';

export function loadContacts() {
  return (dispatch, getState) => {
    dispatch({
      type: SIDEBAR_CONTACTS_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('sidebar.contacts'),
        get: () => {
          const user = Meteor.user();

          if (user) {
            const ids = user.profile && user.profile.contacts ? user.profile.contacts : null;

            if (ids) {
              const oldContacts = getState().sidebar.contacts;
              const contacts = Meteor.users.find({
                _id: {
                  $in: ids
                }
              }).fetch();
              
              oldContacts.forEach(oldContact => {
                const contact = _.findWhere(contacts, { _id: oldContact._id });
                if (contact && oldContact.status && !oldContact.status.online && contact.status && contact.status.online) {
                  dispatch(
                    Notifications.info({
                      title: `New connection`,
                      message: `${contact.username} just logged in.`,
                      position: 'br',
                      autoDismiss: 5,
                      dismissible: true,
                      action: {
                        label: 'Start chat',
                        callback: () => browserHistory.push(`/chat/${contact.username}`)
                      }
                    })
                  );
                }
              });
              return contacts;
            }
          }
          return [];
        },
      },
    });
  };
}
