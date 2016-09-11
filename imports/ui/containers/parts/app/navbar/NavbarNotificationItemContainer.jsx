import { connect } from 'react-redux';

import { markNotificationSeen } from '/imports/actions/navbar/notifications/seen';

import { NavbarNotificationItemComponent } from '/imports/ui/components/parts/app/navbar/NavbarNotificationItemComponent/NavbarNotificationItemComponent';

const mapStateToProps = (state, props) => {
  return {
    user: _.findWhere(state.navbar.users, {
      _id: props.notification.targetId,
    }),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    markNotificationSeen: () => {
      dispatch(markNotificationSeen(props.notification));
    }
  };
};

export const NavbarNotificationItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarNotificationItemComponent);
