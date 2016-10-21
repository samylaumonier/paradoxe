export const VIDEO_CLOSED = 'VIDEO_CLOSED';

export function videoClosed(contactId, videoId) {
  return {
    type: VIDEO_CLOSED,
    contactId,
    videoId,
  };
}
