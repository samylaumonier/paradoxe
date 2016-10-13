import React from 'react';

import { LockableButtonComponent } from '/imports/ui/components/parts/app/spinner/LockableButtonComponent';

import '/imports/ui/styles/pages/ForgotPasswordPageComponentStyle.less';

export const ForgotPasswordPageComponent = React.createClass({
  propTypes: {
    forgot: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div id="forget-password-page">
        <div className="ui form column grid aligned centered stackable">
          <div className="six wide centered aligned column">
            <div className="ui child segment">
              <form className="column" onSubmit={this.onSubmit}>
                <h2 className="ui teal image header">
                  <div className="content">
                    Forgot password
                  </div>
                </h2>
                <div className="ui form">
                  <div className="field">
                    <label>Email</label>
                    <div className="ui left labeled icon input">
                      <input ref="email" type="email" placeholder="Enter email" required/>
                      <i className="mail icon"/>
                    </div>
                  </div>
                  <LockableButtonComponent ref="button" type="submit" className="ui green submit button">
                    Send email
                  </LockableButtonComponent>
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

    this.props.forgot(this.refs.email.value, () => {
      this.refs.button.unlock();
    });
  }
});
