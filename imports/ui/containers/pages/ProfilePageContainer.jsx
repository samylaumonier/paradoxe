import { connect } from 'react-redux';

import { loadProfile } from '/imports/actions/profile/load';

import { ProfilePageComponent } from '/imports/ui/components/pages/ProfilePageComponent';

const mapStateToProps = state => {
  return {
    currentUser: state.user,
    user: state.profile.user,
    ready: state.profile.ready,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadProfile: (username = props.params.username) => {
      dispatch(loadProfile(username));
    }
  };
};

export const ProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageComponent);
