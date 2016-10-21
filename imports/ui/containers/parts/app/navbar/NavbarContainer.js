import { connect } from 'react-redux';

import { loadInvites } from '/imports/actions/navbar/invites/load';
import { loadNotifications } from '/imports/actions/navbar/notifications/load';
import { seeAll } from '/imports/actions/navbar/notifications/seenAll';
import { logout } from '/imports/actions/user/logout';

import { NavbarComponent } from '/imports/ui/components/parts/app/navbar/NavbarComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
    hasInvites: state.navbar.totalInvites > 0,
    totalInvites: state.navbar.totalInvites,
    hasNotifications: state.navbar.notifications.length > 0,
    totalNotifications: state.navbar.notifications.length,
    notifications: state.navbar.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInvites: () => {
      dispatch(loadInvites());
    },
    loadNotifications: () => {
      dispatch(loadNotifications());
    },
    logout: () => {
      dispatch(logout());
    },
    seeAll: () => {
      dispatch(seeAll());
    },
  };
};

export const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent);
