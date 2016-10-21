import { socket } from '/imports/api/socket/client';
import { CHAT_VIDEO_PAUSE } from '/imports/api/socket/videos';
import { getKey } from '/imports/api/socket/videos';

export function pauseVideo(contactId, videoId) {
  return (dispatch, getState) => {
    const key = getKey({
      contactId,
      videoId,
    });

    const video = getState().videos[key];

    if (video) {
      video.player.pauseVideo();

      socket.emit(CHAT_VIDEO_PAUSE, {
        contactId,
        videoId,
        seconds: video.player.getCurrentTime(),
      });
    }
  };
}
