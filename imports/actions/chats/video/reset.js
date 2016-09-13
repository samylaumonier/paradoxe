export const CHAT_VIDEO_RESET = 'CHAT_VIDEO_RESET';

export function chatVideoReset(contact) {
  return {
    type: CHAT_VIDEO_RESET,
    contact,
  };
}
