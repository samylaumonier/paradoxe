import React from 'react';

import { LockableButtonComponent } from '/imports/ui/components/parts/app/spinner/LockableButtonComponent';

export const LoginComponent = React.createClass({
  propTypes: {
    login: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <form className="column" onSubmit={this.onSubmit}>
        <h2 className="ui teal image header">
          <div className="content">
            See who's online
          </div>
        </h2>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <div className="ui left icon input">
              <input ref="username" type="text" placeholder="Username" required/>
              <i className="user icon"/>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui left icon input">
              <input ref="password" type="password" placeholder="Password" required/>
              <i className="lock icon"/>
            </div>
          </div>
          <LockableButtonComponent ref="button" type="submit" className="ui blue submit button">
            Login
          </LockableButtonComponent>
        </div>
      </form>
    );
  },
  onSubmit: function (e) {
    e.preventDefault();

    if (this.refs.button.isLocked()) {
      return false;
    }

    this.refs.button.lock();

    const username = $(this.refs.username).val();
    const password = $(this.refs.password).val();

    this.props.login(username, password, () => {
      this.refs.button.unlock();
    });
  },
});
