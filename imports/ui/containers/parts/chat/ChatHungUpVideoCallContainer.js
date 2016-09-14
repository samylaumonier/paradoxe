import { connect } from 'react-redux';

import { videoCallHungUp } from '/imports/actions/chats/video/hungup';

import { ChatHungUpVideoCallComponent } from '/imports/ui/components/parts/chat/ChatHungUpVideoCallComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    videoCallHungUp: () => {
      dispatch(videoCallHungUp(props.contact, props.message));
    },
  };
};

export const ChatHungUpVideoCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHungUpVideoCallComponent);
