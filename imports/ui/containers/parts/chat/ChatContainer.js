import { connect } from 'react-redux';

import { ChatComponent } from '/imports/ui/components/parts/chat/ChatComponent';

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    messages: state.chats[props.contact.username].messages,
  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatComponent);
