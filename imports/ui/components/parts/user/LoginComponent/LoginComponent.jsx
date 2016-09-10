import React from 'react';

export const LoginComponent = React.createClass({
  propTypes: {
    login: React.PropTypes.func.isRequired,
  },
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
          <button type="submit" className="ui blue submit button">Login</button>
        </div>
      </form>
    );
  },
  login: function (e) {
    e.preventDefault();
    
    const username = $(this.refs.username).val();
    const password = $(this.refs.password).val();

    this.props.login(username, password);
  }
});
