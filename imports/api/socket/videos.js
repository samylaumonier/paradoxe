export const CHAT_VIDEO_OPEN = 'chatVideoOpen';
export const CHAT_VIDEO_PLAY = 'chatVideoPlay';
export const CHAT_VIDEO_PAUSE = 'chatVideoPause';
export const CHAT_VIDEO_SEEK_TO = 'chatVideoSeekTo';
export const CHAT_VIDEO_CLOSE = 'chatVideoClose';

export function getKey(values) {
  return `${values.contactId}-${values.videoId}`;
}
