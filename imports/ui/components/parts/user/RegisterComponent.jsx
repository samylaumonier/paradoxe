import React from 'react';

import { LockableButtonComponent } from '/imports/ui/components/parts/app/spinner/LockableButtonComponent';

export const RegisterComponent = React.createClass({
  propTypes: {
    register: React.PropTypes.func.isRequired,
  },
  render: function ()  {
    return (
      <form className="column" onSubmit={this.register}>
        <h2 className="ui teal image header">
          <div className="content">
            Join in the chat
          </div>
        </h2>
        <div className="ui form">
          <div className="ui two column doubling stackable grid">
            <div className="column">
              <div className="field">
                <label>Username</label>
                <div className="ui left icon input">
                  <input ref="username" type="text" placeholder="Username" required/>
                  <i className="user icon"/>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label>Email</label>
                <div className="ui left icon input">
                  <input ref="email" type="email" placeholder="Email" required/>
                  <i className="at icon"/>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div className="field">
            <label>Password</label>
            <div className="ui left icon input">
              <input ref="password" type="password" placeholder="Password" required/>
              <i className="lock icon"/>
            </div>
          </div>
          <LockableButtonComponent ref="button" type="submit" className="ui green submit button">
            Sign up
          </LockableButtonComponent>
        </div>
      </form>
    );
  },
  register: function (e) {
    e.preventDefault();

    if (this.refs.button.isLocked()) {
      return false;
    }

    this.refs.button.lock();

    const username = $(this.refs.username).val();
    const email = $(this.refs.email).val();
    const password = $(this.refs.password).val();

    this.props.register(username, email, password, () => {
      this.refs.button.unlock();
    });
  }
});