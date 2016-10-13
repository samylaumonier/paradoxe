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
    answerVideoCall: button => {
      if (button.isLocked()) {
        return false;
      }

      button.lock();

      dispatch(answerVideoCall(props.contact, props.message, () => {
        button.unlock();
      }));
    },
    declineVideoCall: button => {
      if (button.isLocked()) {
        return false;
      }

      button.lock();

      dispatch(declineVideoCall(props.contact, props.message, () => {
        button.unlock();
      }));
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
