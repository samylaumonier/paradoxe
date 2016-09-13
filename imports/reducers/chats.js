import { CHAT_SUBSCRIPTION_READY, CHAT_SUBSCRIPTION_CHANGED } from '/imports/actions/chats/load';
import { CHAT_VIDEO_UPDATE } from '/imports/actions/chats/video/update';
import { CHAT_VIDEO_RESET } from '/imports/actions/chats/video/reset';

const initialState = {};

const defaultVideoCallState = {
  peer: null,
  stream: null,
  call: null,
  contactStream: null,
  userPeerId: null,
  contactPeerId: null,
  callMessageId: null,
  isHangingUp: false,
};

export const defaultChatState = {
  ready: false,
  hasContact: false,
  contact: null,
  messages: [],
  users: [],
  files: [],
  videoCall: {
    ...defaultVideoCallState,
  },
};

export function chats(state = initialState, action) {
  let nextState = null;

  switch (action.type) {
    case CHAT_SUBSCRIPTION_READY:
      nextState = getNextState(state, action.data.contactUsername);
      nextState[action.data.contactUsername].ready = action.ready;

      return nextState;
    case CHAT_SUBSCRIPTION_CHANGED:
      if (!action.data.contact) {
        return state;
      }

      nextState = getNextState(state, action.data.contact.username);
      nextState[action.data.contact.username] = {
        ...nextState[action.data.contact.username],
        ...action.data,
      };

      if (!nextState[action.data.contact.username].videoCall) {
        nextState[action.data.contact.username].videoCall = {
          ...defaultVideoCallState,
        };
      }

      return nextState;
    case CHAT_VIDEO_UPDATE:
      nextState = getNextState(state, action.contact.username);

      nextState[action.contact.username].videoCall = {
        ...nextState[action.contact.username].videoCall,
        ...action.data,
      };

      return nextState;
    case CHAT_VIDEO_RESET:
      nextState = getNextState(state, action.contact.username);
      nextState[action.contact.username].videoCall = {
        ...defaultVideoCallState,
      };

      return nextState;
    default:
      return state;
  }
}

function getNextState(state, username) {
  const nextState = {
    ...state,
  };

  if (!nextState[username]) {
    nextState[username] = {
      ...defaultChatState,
    };
  }

  return nextState;
}
