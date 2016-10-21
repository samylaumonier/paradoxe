export const VIDEO_MUTED = 'VIDEO_MUTED';

export function videoMuted(contactId, videoId) {
  return {
    type: VIDEO_MUTED,
    contactId,
    videoId,
  };
}
