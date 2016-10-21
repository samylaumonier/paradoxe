import { socket } from '/imports/api/socket/client';

import { openVideo } from './open';
import { closeVideo } from './close';

import {
  CHAT_VIDEO_OPEN,
  CHAT_VIDEO_PLAY,
  CHAT_VIDEO_PAUSE,
  CHAT_VIDEO_SEEK_TO,
  CHAT_VIDEO_CLOSE,
  getKey
} from '/imports/api/socket/videos';

export function listenVideos() {
  return (dispatch, getState) => {
    const getVideo = (options, callback) => {
      const key = getKey(options);
      const video = getState().videos[key];

      if (video) {
        callback(video);
      }
    };

    socket.on(CHAT_VIDEO_OPEN, options => {
      dispatch(openVideo(options.contactId, options.videoId, false));
    });

    socket.on(CHAT_VIDEO_PLAY, options => {
      getVideo(options, video => {
        video.player.seekTo(options.seconds, true);
        video.player.playVideo();
      });
    });

    socket.on(CHAT_VIDEO_PAUSE, options => {
      getVideo(options, video => {
        video.player.seekTo(options.seconds, true);
        video.player.pauseVideo();
      });
    });

    socket.on(CHAT_VIDEO_SEEK_TO, options => {
      getVideo(options, video => {
        video.player.seekTo(options.seconds, true);
      });
    });

    socket.on(CHAT_VIDEO_CLOSE, options => {
      dispatch(closeVideo(options.contactId, options.videoId, false));
    });
  };
}
