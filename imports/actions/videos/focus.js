export const VIDEO_FOCUS = 'VIDEO_FOCUS';

export function focusVideo(contactId, videoId) {
  return {
    type: VIDEO_FOCUS,
    contactId,
    videoId,
  };
}
