import { SIDEBAR_CONTACTS_SUBSCRIPTION_READY, SIDEBAR_CONTACTS_SUBSCRIPTION_CHANGED } from '/imports/actions/sidebar/contacts/load';
import { SIDEBAR_MESSAGES_SUBSCRIPTION_READY, SIDEBAR_MESSAGES_SUBSCRIPTION_CHANGED } from '/imports/actions/sidebar/messages/load';
import { SIDEBAR_GROUPS_SUBSCRIPTION_READY, SIDEBAR_GROUPS_SUBSCRIPTION_CHANGED } from '/imports/actions/sidebar/groups/load';
import { FILTER_CONTACTS } from '/imports/actions/sidebar/contacts/filter';
import { FILTER_GROUPS } from '/imports/actions/sidebar/groups/filter';

const initialState = {
  contactsFilter: '',
  contactsReady: false,
  contacts: [],
  messagesReady: false,
  messages: [],
  groupsFilter: '',
  groupsReady: false,
  groups: [],
};

export function sidebar(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_CONTACTS_SUBSCRIPTION_READY:
      return {
        ...state,
        contactsReady: action.ready,
      };
    case SIDEBAR_CONTACTS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        contacts: action.data,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        contactsFilter: action.filter,
      };
    case SIDEBAR_MESSAGES_SUBSCRIPTION_READY:
      return {
        ...state,
        messagesReady: action.ready,
      };
    case SIDEBAR_MESSAGES_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        messages: action.data,
      };
    case SIDEBAR_GROUPS_SUBSCRIPTION_READY:
      return {
        ...state,
        groupsReady: action.ready,
      };
    case SIDEBAR_GROUPS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        groups: action.data,
      };
    case FILTER_GROUPS:
      return {
        ...state,
        groupsFilter: action.filter,
      };
    default:
      return state;
  }
}
