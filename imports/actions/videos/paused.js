export const VIDEO_PAUSED = 'VIDEO_PAUSED';

export function videoPaused(contactId, videoId) {
  return {
    type: VIDEO_PAUSED,
    contactId,
    videoId,
  };
}
