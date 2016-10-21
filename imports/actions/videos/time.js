export const VIDEO_SET_CURRENT_TIME = 'VIDEO_SET_CURRENT_TIME';

export function setVideoCurrentTime(contactId, videoId, currentTime) {
  return {
    type: VIDEO_SET_CURRENT_TIME,
    contactId,
    videoId,
    currentTime,
  };
}
