import { loadChat } from '../load';

export const CHAT_INCREASE_LIMIT = 'CHAT_INCREASE_LIMIT';

export function increaseChatLimit(contactUsername) {
  return dispatch => {
    dispatch({
      type: CHAT_INCREASE_LIMIT,
      contactUsername,
    });

    dispatch(loadChat(contactUsername));
  };
}
