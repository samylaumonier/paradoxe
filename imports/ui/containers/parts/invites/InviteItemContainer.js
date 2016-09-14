import { connect } from 'react-redux';

import { acceptInvite } from '/imports/actions/invites/accept';
import { declineInvite } from '/imports/actions/invites/decline';

import { InviteItemComponent } from '/imports/ui/components/parts/invites/InviteItemComponent';

const mapStateToProps = (state, props) => {
  return {
    user: _.findWhere(state.invites.users, {
      _id: props.invite.userId,
    }),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    acceptInvite: () => {
      dispatch(acceptInvite(props.invite._id));
    },
    declineInvite: () => {
      dispatch(declineInvite(props.invite._id));
    },
  };
};

export const InviteItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteItemComponent);
