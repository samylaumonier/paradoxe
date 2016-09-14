import { connect } from 'react-redux';

import { defaultChatState } from '/imports/reducers/chats';
import { loadChat } from '/imports/actions/chats/load';

import { ChatPageComponent } from '/imports/ui/components/pages/ChatPageComponent';

const mapStateToProps = (state, props) => {
  const chatState = state.chats[props.params.contactUsername] || defaultChatState;

  return {
    user: state.user,
    ready: chatState.ready,
    hasContact: chatState.hasContact,
    contact: chatState.contact,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadMessages: (username = props.params.contactUsername) => {
      dispatch(loadChat(username));
    },
  };
};

export const ChatPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPageComponent);
