import React from 'react';

export const ChangePasswordPageComponent = React.createClass({
  propTypes: {
    change: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div className="ui bottom attached center segment">
        <h1>Change password</h1>
        <div className="ui form segment">
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
            <div className="ui green submit button" onClick={this.change}>Reset password</div>
          </div>
        </div>
      </div>
    );
  },
  change: function () {
    this.props.change(this.refs.oldPassword.value, this.refs.newPassword.value);
  }
});
