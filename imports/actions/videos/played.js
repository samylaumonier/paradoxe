export const VIDEO_PLAYED = 'VIDEO_PLAYED';

export function videoPlayed(contactId, videoId) {
  return {
    type: VIDEO_PLAYED,
    contactId,
    videoId,
  };
}
