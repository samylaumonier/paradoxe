import { connect } from 'react-redux';

import { cancelVideoCall } from '/imports/actions/chats/video/cancel';
import { videoCallDeclined } from '/imports/actions/chats/video/declined';
import { videoCallMissed } from '/imports/actions/chats/video/missed';

import { ChatOutgoingVideoCallComponent } from '/imports/ui/components/parts/chat/ChatOutgoingVideoCallComponent/ChatOutgoingVideoCallComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    videoCallDeclined: () => {
      console.log('DECLINED!')
      dispatch(videoCallDeclined(props.contact, props.message));
    },
    videoCallMissed: () => {
      dispatch(videoCallMissed(props.contact, props.message));
    },
    cancelVideoCall: () => {
      dispatch(cancelVideoCall(props.contact, props.message));
    },
  };
};

export const ChatOutgoingVideoCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatOutgoingVideoCallComponent);
