import { setVideoCurrentTime } from '/imports/actions/videos/time';

export const VIDEO_READY = 'VIDEO_READY';

export function videoReady(contactId, videoId, player) {
  return dispatch => {
    dispatch({
      type: VIDEO_READY,
      contactId,
      videoId,
      player,
      muted: player.isMuted(),
      title: player.getVideoData().title,
      duration: player.getDuration(),
      currentTime: 0,
      progressInterval: setInterval(() => {
        dispatch(setVideoCurrentTime(contactId, videoId, player.getCurrentTime()));
      }, 250),
    });
  };
}
