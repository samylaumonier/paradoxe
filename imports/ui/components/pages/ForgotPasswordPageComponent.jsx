import React from 'react';

import  '/imports/ui/styles/pages/ForgotPasswordPageComponentStyle.less';

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
            <form className="column" onSubmit={this.forgot}>
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
                <button type="submit" className="ui green submit button">Send email</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  },
  forgot: function (e) {
    e.preventDefault();
    this.props.forgot(this.refs.email.value);
  }
});
