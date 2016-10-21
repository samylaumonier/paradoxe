export const VIDEO_OPENED = 'VIDEO_OPENED';

export function videoOpened(contactId, videoId) {
  return {
    type: VIDEO_OPENED,
    contactId,
    videoId,
  };
}
