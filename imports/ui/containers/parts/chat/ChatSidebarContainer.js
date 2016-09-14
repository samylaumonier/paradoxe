import { connect } from 'react-redux';

import { ChatSidebarComponent } from '/imports/ui/components/parts/chat/ChatSidebarComponent';

const mapStateToProps = (state, props) => {
  const videoCallState = state.chats[props.contact.username].videoCall;

  return {
    user: state.user,
    stream: videoCallState.stream,
    contactStream: videoCallState.contactStream,
  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export const ChatSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatSidebarComponent);
