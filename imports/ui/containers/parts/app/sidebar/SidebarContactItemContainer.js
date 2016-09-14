import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getUserStatus, userHasBlockedContact } from '/imports/api/collections/users';

import { SidebarContactItemComponent } from '/imports/ui/components/parts/app/sidebar/SidebarContactItemComponent';

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    contactStatus: getUserStatus(props.contact.status),
    userHasBlockedContact: userHasBlockedContact(state.user, props.contact._id),
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
