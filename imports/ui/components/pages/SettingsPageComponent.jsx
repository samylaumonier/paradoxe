import React from 'react';

import '/imports/ui/styles/pages/SettingsPageComponentStyle.less';

import { ChangePasswordPageContainer } from '/imports/ui/containers/parts/user/ChangePasswordContainer';

export const SettingsPageComponent = React.createClass({
  propTypes: {
    profilePictureUploading: React.PropTypes.bool.isRequired,
    profilePictureProgress: React.PropTypes.number.isRequired,
    uploadProfilePicture: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    $('.ui.accordion').accordion();
  },
  render: function () {
    const progress = this.props.profilePictureUploading
      ? <span>(uploading, {this.props.profilePictureProgress} %)</span> : null;
    
    return (
      <div id="settings-page">
        <div className="ui form column grid aligned centered stackable">
          <div className="twelve wide centered aligned column">
            <div className="ui child">
              <div className="column">
                <div className="treemenu boxed">
                  <div className="ui fluid styled accordion">
                    <div className="title">
                      <i className="dropdown icon"/> Change password
                    </div>
                    <div className="content">
                      <ChangePasswordPageContainer/>
                    </div>
                    <div className="title">
                      <i className="dropdown icon"/> Change profile picture
                    </div>
                    <div className="content">
                      <button type="button" className="ui green button" onClick={this.openSelectProfilePicture}>
                        Change profile picture {progress}
                      </button>
                    </div>
                    <div className="title">
                      <i className="dropdown icon"/> Paradoxe
                    </div>
                    <div className="content">
                      <div className="content">
                        <p>
                          Version {Meteor.settings.public.version} <br/>
                          Made in Lyon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
