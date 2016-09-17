import { connect } from 'react-redux';

import { readMessage } from '/imports/actions/chats/message/read';

import { ChatTaggedMessageComponent } from '/imports/ui/components/parts/chat/ChatTaggedMessageComponent';

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

export const ChatTaggedMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatTaggedMessageComponent);
