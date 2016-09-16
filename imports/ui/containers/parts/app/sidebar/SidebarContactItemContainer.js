import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getUserStatus, userHasBlockedContact } from '/imports/api/collections/users';
import { INCOMING_VIDEO_CALL_TAG, OUTGOING_VIDEO_CALL_TAG, RINGING_STATUS } from '/imports/api/collections/messages';

import { SidebarContactItemComponent } from '/imports/ui/components/parts/app/sidebar/SidebarContactItemComponent';

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    contactStatus: getUserStatus(props.contact.status),
    userHasBlockedContact: userHasBlockedContact(state.user, props.contact._id),
    incomingCall: state.sidebar.messages.filter(message => {
      return message.tag === INCOMING_VIDEO_CALL_TAG &&
          message.status === RINGING_STATUS &&
          message.toUserId.includes(state.user._id) &&
          message.contactId.includes(props.contact._id);
    }),
    outgoingCall: state.sidebar.messages.filter(message => {
      return message.tag === OUTGOING_VIDEO_CALL_TAG &&
          message.status === RINGING_STATUS &&
          message.toUserId.includes(state.user._id) &&
          message.contactId.includes(props.contact._id);
    }),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    openChat: () => {
      browserHistory.push(`/chat/${props.contact.username}`);
    }
  };
};

export const SidebarContactItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContactItemComponent);
