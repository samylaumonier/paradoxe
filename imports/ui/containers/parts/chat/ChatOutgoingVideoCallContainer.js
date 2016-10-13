import { connect } from 'react-redux';

import { cancelVideoCall } from '/imports/actions/chats/video/cancel';
import { videoCallDeclined } from '/imports/actions/chats/video/declined';
import { videoCallMissed } from '/imports/actions/chats/video/missed';

import { ChatOutgoingVideoCallComponent } from '/imports/ui/components/parts/chat/ChatOutgoingVideoCallComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    videoCallDeclined: () => {
      dispatch(videoCallDeclined(props.contact, props.message));
    },
    videoCallMissed: () => {
      dispatch(videoCallMissed(props.contact, props.message));
    },
    cancelVideoCall: button => {
      if (button.isLocked()) {
        return false;
      }

      button.lock();

      dispatch(cancelVideoCall(props.contact, props.message, () => {
        button.unlock();
      }));
    },
  };
};

export const ChatOutgoingVideoCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatOutgoingVideoCallComponent);
