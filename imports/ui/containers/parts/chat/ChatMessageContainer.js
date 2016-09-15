import { connect } from 'react-redux';

import { ChatMessageComponent } from '/imports/ui/components/parts/chat/ChatMessageComponent';

const mapStateToProps = (state, props) => {
  return {
    author: _.findWhere(state.chats[props.contact.username].users, {
      _id: props.message.userId,
    }),
  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export const ChatMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMessageComponent);
