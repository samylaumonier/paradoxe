import { PROFILE_SUBSCRIPTION_READY, PROFILE_SUBSCRIPTION_CHANGED } from '/imports/actions/profile/load';

const initialState = {
  ready: false,
  user: null,
};

export function profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.ready,
      };
    case PROFILE_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}
