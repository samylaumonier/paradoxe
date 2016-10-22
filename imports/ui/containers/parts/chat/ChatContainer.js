import { connect } from 'react-redux';

import { increaseChatLimit } from '/imports/actions/chats/message/limit';

import { ChatComponent } from '/imports/ui/components/parts/chat/ChatComponent';

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    ready: state.chats[props.contact.username].ready,
    messages: state.chats[props.contact.username].messages,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    increaseChatLimit: () => {
      dispatch(increaseChatLimit(props.contact.username));
    },
  };
};

export const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatComponent);
