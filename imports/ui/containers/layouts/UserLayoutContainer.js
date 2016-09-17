import { connect } from 'react-redux';

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
      dispatch(loadUser());
    }
  };
};

export const UserLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLayoutComponent);
