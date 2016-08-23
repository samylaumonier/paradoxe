import React from 'react';
import { browserHistory } from 'react-router';

export const LoginComponent = React.createClass({
  render: function ()  {
    return (
      <form className="column" onSubmit={this.login}>
        <h2 className="ui teal image header">
          <div className="content">
            Login
          </div>
        </h2>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <div className="ui left icon input">
              <input id="login-username" type="text" placeholder="Username" required/>
              <i className="user icon"/>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui left icon input">
              <input id="login-password" type="password" placeholder="Password" required/>
              <i className="lock icon"/>
            </div>
          </div>
          <button type="submit" className="ui blue submit button">Login</button>
        </div>
      </form>
    );
  },
  login: function (e) {
    e.preventDefault();

    const username = $('#login-username').val();
    const password = $('#login-password').val();
  
    Meteor.loginWithPassword(username, password, (err, res) => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success('Welcome back', 'Logged in');
        browserHistory.push('/');
      }
    });
  }
});
