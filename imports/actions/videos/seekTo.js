import { socket } from '/imports/api/socket/client';
import { CHAT_VIDEO_SEEK_TO } from '/imports/api/socket/videos';
import { getKey } from '/imports/api/socket/videos';

export function seekTo(contactId, videoId, seconds) {
  return (dispatch, getState) => {
    const key = getKey({
      contactId,
      videoId,
    });

    const video = getState().videos[key];

    if (video) {
      video.player.seekTo(seconds, true);

      socket.emit(CHAT_VIDEO_SEEK_TO, {
        contactId,
        videoId,
        seconds,
      });
    }
  };
}
