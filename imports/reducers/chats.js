import { SAVE_CALL_STATE } from '/imports/actions/chats/save';
import { DELETE_CALL_STATE } from '/imports/actions/chats/delete';

const initialState = {};

export function chats(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case SAVE_CALL_STATE:
      nextState = Object.assign({}, state);

      if (!nextState[action.contactUsername]) {
        nextState[action.contactUsername] = {};
      }

      const keys = ['stream', 'call', 'contactStream'];

      keys.forEach(key => {
        if (action.callState[key]) {
          nextState[action.contactUsername][key] = action.callState[key];
        }
      });

      return nextState;
    case DELETE_CALL_STATE:
      nextState = Object.assign({}, state);
      delete nextState[action.contactUsername];
      return nextState;
    default:
      return state;
  }
}
