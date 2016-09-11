import { INVITES_PAGE_SUBSCRIPTION_READY, INVITES_PAGE_SUBSCRIPTION_CHANGED } from '/imports/actions/invites/load';

const initialState = {
  ready: false,
  invites: [],
  users: [],
};

export function invites(state = initialState, action) {
  switch (action.type) {
    case INVITES_PAGE_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.ready,
      };
    case INVITES_PAGE_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        invites: action.data.invites,
        users: action.data.users,
      };
    default:
      return state;
  }
}
