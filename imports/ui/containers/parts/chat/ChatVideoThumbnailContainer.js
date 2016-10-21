import { connect } from 'react-redux';

import { openVideo } from '/imports/actions/videos/open';

import { ChatVideoThumbnailComponent } from '/imports/ui/components/parts/chat/ChatVideoThumbnailComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: event => {
      event.preventDefault();
      dispatch(openVideo(props.contactId, props.videoId));
    },
  };
};

export const ChatVideoThumbnailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatVideoThumbnailComponent);
