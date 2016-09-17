import { connect } from 'react-redux';

import { readMessage } from '/imports/actions/chats/message/read';

import { ChatMessageComponent } from '/imports/ui/components/parts/chat/ChatMessageComponent';

const mapStateToProps = (state, props) => {
  return {
    author: _.findWhere(state.chats[props.contact.username].users, {
      _id: props.message.userId,
    }),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    readMessage: () => {
      dispatch(readMessage(props.message._id));
    },
  };
};

export const ChatMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMessageComponent);
