export const CHAT_VIDEO_UPDATE = 'CHAT_VIDEO_UPDATE';

export function chatVideoUpdate(contact, data) {
  return {
    type: CHAT_VIDEO_UPDATE,
    contact,
    data,
  };
}
