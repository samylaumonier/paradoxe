import { connect } from 'react-redux';

import { ProfilePictureComponent } from '/imports/ui/components/parts/profile/ProfilePictureComponent.jsx';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export const ProfilePictureContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePictureComponent);
