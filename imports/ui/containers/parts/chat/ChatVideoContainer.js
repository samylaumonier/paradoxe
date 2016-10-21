import { connect } from 'react-redux';

import { closeVideo } from '/imports/actions/videos/close';
import { playVideo } from '/imports/actions/videos/play';
import { pauseVideo } from '/imports/actions/videos/pause';
import { seekTo } from '/imports/actions/videos/seekTo';
import { videoReady } from '/imports/actions/videos/ready';
import { videoPlayed } from '/imports/actions/videos/played';
import { videoPaused } from '/imports/actions/videos/paused';
import { muteVideo } from '/imports/actions/videos/mute';
import { unMuteVideo } from '/imports/actions/videos/unMute';

import { ChatVideoComponent } from '/imports/ui/components/parts/chat/ChatVideoComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onReady: event => {
      dispatch(videoReady(props.contactId, props.videoId, event.target));
    },
    onClose: () => {
      dispatch(closeVideo(props.contactId, props.videoId));
    },
    onPlay: () => {
      dispatch(playVideo(props.contactId, props.videoId));
    },
    onPause: () => {
      dispatch(pauseVideo(props.contactId, props.videoId));
    },
    onSeekTo: seconds => {
      dispatch(seekTo(props.contactId, props.videoId, seconds));
    },
    onPlayed: () => {
      dispatch(videoPlayed(props.contactId, props.videoId));
    },
    onPaused: () => {
      dispatch(videoPaused(props.contactId, props.videoId));
    },
    onUnMute: () => {
      dispatch(unMuteVideo(props.contactId, props.videoId));
    },
    onMute: () => {
      dispatch(muteVideo(props.contactId, props.videoId));
    },
  };
};

export const ChatVideoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatVideoComponent);
