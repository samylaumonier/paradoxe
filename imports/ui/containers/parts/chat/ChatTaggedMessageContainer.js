import { connect } from 'react-redux';

import { ChatTaggedMessageComponent } from '/imports/ui/components/parts/chat/ChatTaggedMessageComponent';

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

export const ChatTaggedMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatTaggedMessageComponent);
