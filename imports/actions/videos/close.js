import { socket } from '/imports/api/socket/client';
import { CHAT_VIDEO_CLOSE } from '/imports/api/socket/videos';
import { getKey } from '/imports/api/socket/videos';
import { videoClosed } from './closed';

export function closeVideo(contactId, videoId, emit = true) {
  return (dispatch, getState) => {
    const key = getKey({
      contactId,
      videoId,
    });

    const video = getState().videos[key];

    if (video) {
      if (emit) {
        socket.emit(CHAT_VIDEO_CLOSE, {
          contactId,
          videoId,
        });
      }

      if (video.progressInterval != null) {
        clearInterval(video.progressInterval);
      }

      dispatch(videoClosed(contactId, videoId));
    }
  };
}
