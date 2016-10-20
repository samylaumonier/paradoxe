import { connect } from 'react-redux';

import { listenVideos } from '/imports/actions/videos/listen';
import { focusVideo } from '/imports/actions/videos/focus';

import { ChatVideosComponent } from '/imports/ui/components/parts/chat/ChatVideosComponent';

const mapStateToProps = state => {
  return {
    videos: _.values(state.videos),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onReady: () => {
      dispatch(listenVideos());
    },
    onStartDrag: (event, data) => {
      dispatch(focusVideo(data.node.dataset.contactId, data.node.dataset.videoId));
    },
  };
};

export const ChatVideosContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatVideosComponent);
