import { connect } from 'react-redux';

import { userHasBlockedContact } from '/imports/api/collections/users';
import { startVideoCall } from '/imports/actions/chats/video/start';
import { stopVideoCall } from '/imports/actions/chats/video/stop';

import { ChatNavbarComponent } from '/imports/ui/components/parts/chat/ChatNavbarComponent/ChatNavbarComponent';

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    userHasBlockedContact: userHasBlockedContact(state.user, props.contact._id),
    currentVideoCall: !!state.chats[props.contact.username].videoCall.call,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startVideoCall: () => {
      dispatch(startVideoCall(props.contact));
    },
    stopVideoCall: () => {
      dispatch(stopVideoCall(props.contact));
    },
  };
};

export const ChatNavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatNavbarComponent);
