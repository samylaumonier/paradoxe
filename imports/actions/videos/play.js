import { socket } from '/imports/api/socket/client';
import { CHAT_VIDEO_PLAY } from '/imports/api/socket/videos';
import { getKey } from '/imports/api/socket/videos';

export function playVideo(contactId, videoId) {
  return (dispatch, getState) => {
    const key = getKey({
      contactId,
      videoId,
    });

    const video = getState().videos[key];

    if (video) {
      video.player.playVideo();

      socket.emit(CHAT_VIDEO_PLAY, {
        contactId,
        videoId,
        seconds: video.player.getCurrentTime(),
      });
    }
  };
}
