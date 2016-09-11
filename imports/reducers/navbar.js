import { NAVBAR_INVITES_SUBSCRIPTION_READY, NAVBAR_INVITES_SUBSCRIPTION_CHANGED } from '/imports/actions/navbar/invites/load';
import { NAVBAR_NOTIFICATIONS_SUBSCRIPTION_READY, NAVBAR_NOTIFICATIONS_SUBSCRIPTION_CHANGED } from '/imports/actions/navbar/notifications/load';

const initialState = {
  invitesReady: false,
  totalInvites: 0,
  notificationsReady: false,
  notifications: [],
  users: [],
};

export function navbar(state = initialState, action) {
  switch (action.type) {
    case NAVBAR_INVITES_SUBSCRIPTION_READY:
      return {
        ...state,
        invitesReady: action.ready,
      };
    case NAVBAR_INVITES_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        totalInvites: action.data,
      };
    case NAVBAR_NOTIFICATIONS_SUBSCRIPTION_READY:
      return {
        ...state,
        notificationsReady: action.ready,
      };
    case NAVBAR_NOTIFICATIONS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        notifications: action.data.notifications,
        users: action.data.users,
      };
    default:
      return state;
  }
}
