import { getKey } from '/imports/api/socket/videos';
import { videoUnMuted } from './unMuted';

export function unMuteVideo(contactId, videoId) {
  return (dispatch, getState) => {
    const key = getKey({
      contactId,
      videoId,
    });

    const video = getState().videos[key];

    if (video) {
      video.player.unMute();
      dispatch(videoUnMuted(contactId, videoId));
    }
  };
}
