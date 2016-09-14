import { connect } from 'react-redux';

import { answerVideoCall } from '/imports/actions/chats/video/answer';
import { declineVideoCall } from '/imports/actions/chats/video/decline';
import { chatVideoUpdate } from '/imports/actions/chats/video/update';

import { ChatIncomingVideoCallComponent } from '/imports/ui/components/parts/chat/ChatIncomingVideoCallComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    answerVideoCall: () => {
      dispatch(answerVideoCall(props.contact, props.message));
    },
    declineVideoCall: () => {
      dispatch(declineVideoCall(props.contact, props.message));
    },
    videoCallRinging: () => {
      dispatch(chatVideoUpdate(props.contact, {
        isRinging: true,
      }));
    },
    videoCallMissed: () => {
      dispatch(chatVideoUpdate(props.contact, {
        isRinging: false,
      }));
    },
  };
};

export const ChatIncomingVideoCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIncomingVideoCallComponent);
