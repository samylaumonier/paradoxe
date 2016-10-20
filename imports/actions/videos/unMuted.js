export const VIDEO_UN_MUTED = 'VIDEO_UN_MUTED';

export function videoUnMuted(contactId, videoId) {
  return {
    type: VIDEO_UN_MUTED,
    contactId,
    videoId,
  };
}
