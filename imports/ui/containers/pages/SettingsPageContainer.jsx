import { connect } from 'react-redux';

import { uploadProfilePicture } from '/imports/actions/settings/picture';

import { SettingsPageComponent } from '/imports/ui/components/pages/SettingsPageComponent';

const mapStateToProps = state => {
  return {
    profilePictureUploading: state.settings.profilePicture.uploading,
    profilePictureProgress: state.settings.profilePicture.progress,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadProfilePicture: file => {
      dispatch(uploadProfilePicture(file));
    },
  };
};

export const SettingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPageComponent);
