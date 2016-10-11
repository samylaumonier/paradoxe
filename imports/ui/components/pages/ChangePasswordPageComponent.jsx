import React from 'react';

import  '/imports/ui/styles/pages/ChangePasswordPageComponentStyle.less';

export const ChangePasswordPageComponent = React.createClass({
  propTypes: {
    change: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
    <div id="change-password-page">
      <div className="ui form column grid aligned centered stackable">
        <div className="ten wide centered aligned column">
          <div className="ui child segment">
            <form className="column" onSubmit={this.change}>
              <h2 className="ui teal image header">
                <div className="content">
                  Change password
                </div>
              </h2>
              <div className="ui form">
                <div className="field">
                  <label>Old password</label>
                  <div className="ui left labeled icon input">
                    <input ref="oldPassword" type="password" required/>
                    <i className="lock icon"/>
                  </div>
                  <label>New password</label>
                  <div className="ui left labeled icon input">
                    <input ref="newPassword" type="password" required/>
                    <i className="lock icon"/>
                  </div>
                  <br/>
                  <button type="submit" className="ui green submit button">Change it</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  },
  change: function (e) {
    e.preventDefault();
    this.props.change(this.refs.oldPassword.value, this.refs.newPassword.value);
  }
});
