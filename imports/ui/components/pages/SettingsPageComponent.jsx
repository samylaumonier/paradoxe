import React from 'react';
import { Link } from 'react-router';

import '/imports/ui/styles/pages/SettingsPageComponentStyle.less';

export const SettingsPageComponent = React.createClass({
  propTypes: {
    profilePictureUploading: React.PropTypes.bool.isRequired,
    profilePictureProgress: React.PropTypes.number.isRequired,
    uploadProfilePicture: React.PropTypes.func.isRequired,
  },
  render: function () {
    const progress = this.props.profilePictureUploading
      ? <span>(uploading, {this.props.profilePictureProgress} %)</span> : null;

    return (
      <div id="settings-page">
        <Link className="ui green button" to="/change-password">
          Change password
        </Link>
        <button type="button" className="ui green button" onClick={this.openSelectProfilePicture}>
          Change profile picture {progress}
        </button>
        <input type="file" className="hidden" ref="files" onChange={this.uploadProfilePicture}/>
      </div>
    );
  },
  openSelectProfilePicture: function () {
    $(this.refs.files).click();
  },
  uploadProfilePicture: function (event) {
    const file = event.target.files.length === 1 ? event.target.files[0] : null;

    if (file) {
      this.props.uploadProfilePicture(file);
      $(this.refs.files).val('');
    }
  },
});
