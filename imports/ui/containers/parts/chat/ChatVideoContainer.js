import { connect } from 'react-redux';

import { socket } from '/imports/api/socket/client';
import {
  CHAT_VIDEO_PLAY,
  CHAT_VIDEO_PAUSE,
} from '/imports/api/socket/videos';

import { setWatchTogether } from '/imports/actions/chats/youtube/together';

import { ChatVideoComponent } from '/imports/ui/components/parts/chat/ChatVideoComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  const getVideoContext = (event, callback) => {
    callback({
      player: event.target,
      contactId: props.contactId,
      messageId: props.messageId,
      videoId: props.video.id,
    });
  };

  let propagatePlay = true;

  return {
    onVideoReady: event => {
      getVideoContext(event, ({ player, messageId, videoId }) => {
        const isTargetVideo = options => options.messageId === messageId && options.videoId === videoId;

        socket.on(CHAT_VIDEO_PLAY, options => {
          if (isTargetVideo(options)) {
            propagatePlay = false;
            player.seekTo(options.seconds, true);
            player.playVideo();
          }
        });

        socket.on(CHAT_VIDEO_PAUSE, options => {
          if (isTargetVideo(options)) {
            player.seekTo(options.seconds, true);
            player.pauseVideo();
          }
        });
      });
    },
    onVideoPlay: event => {
      if (!props.video.watchTogether) {
        return false;
      }

      if (propagatePlay) {
        getVideoContext(event, ({ player, contactId, messageId, videoId }) => {
          socket.emit(CHAT_VIDEO_PLAY, {
            contactId,
            messageId,
            videoId,
            seconds: player.getCurrentTime(),
          });
        });
      } else {
        propagatePlay = true;
      }
    },
    onVideoPause: event => {
      if (!props.video.watchTogether) {
        return false;
      }

      getVideoContext(event, ({ player, contactId, messageId, videoId }) => {
        socket.emit(CHAT_VIDEO_PAUSE, {
          contactId,
          messageId,
          videoId,
          seconds: player.getCurrentTime(),
        });
      });
    },
    onSetWatchTogether: event => {
      dispatch(setWatchTogether(props.messageId, props.video.id, event.target.checked));
    },
  };
};

export const ChatVideoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatVideoComponent);
