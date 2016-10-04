import React from 'react';

export const ResetPasswordPageComponent = React.createClass({
  propTypes: {
    reset: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div className="ui bottom attached center segment">
        <h1>Reset your password ?</h1>
        <div className="ui form segment">
          <div className="field">
            <label>New password</label>
            <div className="ui left labeled icon input">
              <input ref="password" type="password" required/>
              <i className="mail icon"/>
            </div>
            <div className="ui green submit button" onClick={this.reset}>Reset password</div>
          </div>
        </div>
      </div>
    );
  },
  reset: function () {
    this.props.reset(this.refs.password.value);
  }
});
