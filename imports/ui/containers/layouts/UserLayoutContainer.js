import { connect } from 'react-redux';

import { socket, connect as connectSocket } from '/imports/api/socket/client';
import { loadUser } from '/imports/actions/user/load';

import { UserLayoutComponent } from '/imports/ui/components/layouts/UserLayoutComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      if (!socket) {
        connectSocket();
      }

      dispatch(loadUser());
    }
  };
};

export const UserLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLayoutComponent);
