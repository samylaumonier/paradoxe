import { connect } from 'react-redux';

import { loadInvites } from '/imports/actions/invites/load';

import { ProfilePageComponent } from '/imports/ui/components/pages/ProfilePageComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInvites: () => {
      dispatch(loadInvites());
    }
  };
};

export const ProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageComponent);
