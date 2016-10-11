import { connect } from 'react-redux';

import { readMessage } from '/imports/actions/chats/message/read';
import { deleteMessage } from '/imports/actions/chats/message/delete';

import { ChatMessageComponent } from '/imports/ui/components/parts/chat/ChatMessageComponent';

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    author: _.findWhere(state.chats[props.contact.username].users, {
      _id: props.message.userId,
    }),
    hasVideos: props.message.videos.length !== 0,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    readMessage: () => {
      dispatch(readMessage(props.message._id));
    },
    deleteMessage: () => {
      dispatch(deleteMessage(props.message._id));
    },
  };
};

export const ChatMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMessageComponent);
