import { getKey } from '/imports/api/socket/videos';
import { videoMuted } from './muted';

export function muteVideo(contactId, videoId) {
  return (dispatch, getState) => {
    const key = getKey({
      contactId,
      videoId,
    });

    const video = getState().videos[key];

    if (video) {
      video.player.mute();
      dispatch(videoMuted(contactId, videoId));
    }
  };
}
