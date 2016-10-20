import { socket } from '/imports/api/socket/client';
import { CHAT_VIDEO_OPEN } from '/imports/api/socket/videos';
import { videoOpened } from './opened';

export function openVideo(contactId, videoId, emit = true) {
  return dispatch => {
    if (emit) {
      socket.emit(CHAT_VIDEO_OPEN, {
        contactId,
        videoId,
      });
    }

    dispatch(videoOpened(contactId, videoId));
  };
}
