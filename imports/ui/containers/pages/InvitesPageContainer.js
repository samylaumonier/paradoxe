import { connect } from 'react-redux';

import { loadInvites } from '/imports/actions/invites/load';

import { InvitesPageComponent } from '/imports/ui/components/pages/InvitesPageComponent';

const mapStateToProps = state => {
  return {
    ready: state.invites.ready,
    invites: state.invites.invites,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInvites: () => {
      dispatch(loadInvites());
    }
  };
};

export const InvitesPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesPageComponent);
