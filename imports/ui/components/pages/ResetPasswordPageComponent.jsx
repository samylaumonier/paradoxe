import React from 'react';

import  '/imports/ui/styles/pages/ResetPasswordPageComponentStyle.less';

export const ResetPasswordPageComponent = React.createClass({
  propTypes: {
    reset: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
    <div id="reset-password-page">
      <div className="ui form column grid aligned centered stackable">
        <div className="six wide centered aligned column">
          <div className="ui child segment">
            <form className="column" onSubmit={this.reset}>
              <h2 className="ui teal image header">
                <div className="content">
                  Reset your password
                </div>
              </h2>
              <div className="ui form">
                <div className="field">
                  <label>New password</label>
                  <div className="ui left labeled icon input">
                    <input ref="password" type="password" required/>
                    <i className="lock icon"/>
                  </div>
                </div>
                <br/>
                <button type="submit" className="ui green submit button">Reset password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  },
  reset: function (e) {
    e.preventDefault();
    this.props.reset(this.refs.password.value);
  }
});
