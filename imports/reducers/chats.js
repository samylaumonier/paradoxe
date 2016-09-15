import { CHAT_SUBSCRIPTION_READY, CHAT_SUBSCRIPTION_CHANGED } from '/imports/actions/chats/load';
import { CHAT_VIDEO_UPDATE } from '/imports/actions/chats/video/update';
import { CHAT_VIDEO_RESET } from '/imports/actions/chats/video/reset';
import { CHAT_FILES_DROPPED } from '/imports/actions/chats/file/dropped';
import { CHAT_FILES_UPLOAD_STARTED } from '/imports/actions/chats/file/upload';
import { CHAT_FILE_CLEAN } from '/imports/actions/chats/file/clean';

const initialState = {};

const defaultVideoCallState = {
  peer: null,
  stream: null,
  call: null,
  contactStream: null,
  userPeerId: null,
  contactPeerId: null,
  callMessageId: null,
  isRinging: false,
  isHangingUp: false,
};

export const defaultChatState = {
  ready: false,
  hasContact: false,
  contact: null,
  messages: [],
  users: [],
  files: [],
  localFiles: [],
  uploadHandlers: [],
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
    case CHAT_FILES_DROPPED:
      nextState = getNextState(state, action.contact.username);
      nextState[action.contact.username].localFiles = [
        ...nextState[action.contact.username].localFiles,
        ...action.files,
      ];

      return nextState;
    case CHAT_FILES_UPLOAD_STARTED:
      nextState = getNextState(state, action.contact.username);
      nextState[action.contact.username].uploadHandlers.push(action.uploadHandler);

      return nextState;
    case CHAT_FILE_CLEAN:
      nextState = getNextState(state, action.contact.username);

      const index = nextState[action.contact.username].localFiles.findIndex(localFile => localFile.id === action.localFileId);

      if (index > -1) {
        console.log('before remove', nextState[action.contact.username].localFiles);
        nextState[action.contact.username].localFiles.splice(index, 1);
        console.log('after remove', nextState[action.contact.username].localFiles);
      }

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
