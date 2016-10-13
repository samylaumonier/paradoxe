import React from 'react';

import { LockableButtonComponent } from '/imports/ui/components/parts/app/spinner/LockableButtonComponent';

import '/imports/ui/styles/pages/ResetPasswordPageComponentStyle.less';

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
              <form className="column" onSubmit={this.onSubmit}>
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
                  <LockableButtonComponent ref="button" type="submit" className="ui green submit button">
                    Reset password
                  </LockableButtonComponent>
                  <br/>
                  <div className="centered aligned">
                    <br/>
                    <a href="/login" className="center aligned">Go to login</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  },
  onSubmit: function (e) {
    e.preventDefault();

    if (this.refs.button.isLocked()) {
      return false;
    }

    this.refs.button.lock();

    this.props.reset(this.refs.password.value, () => {
      this.refs.button.unlock();
    });
  }
});
