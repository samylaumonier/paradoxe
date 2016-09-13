import { connect } from 'react-redux';

import { answerVideoCall } from '/imports/actions/chats/video/answer';
import { declineVideoCall } from '/imports/actions/chats/video/decline';

import { ChatIncomingVideoCallComponent } from '/imports/ui/components/parts/chat/ChatIncomingVideoCallComponent/ChatIncomingVideoCallComponent';

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
      dispatch(declineVideoCall(props.message));
    },
  };
};

export const ChatIncomingVideoCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIncomingVideoCallComponent);
