import { INIT_USER } from '/imports/actions/users/init';

export function user(state = null, action) {
  switch (action.type) {
    case INIT_USER:
      return action.user;
    default:
      return state;
  }
}
