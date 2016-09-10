import React from 'react';

export const RegisterComponent = React.createClass({
  propTypes: {
    register: React.PropTypes.func.isRequired,
  },
  render: function ()  {
    return (
      <form className="column" onSubmit={this.register}>
        <h2 className="ui teal image header">
          <div className="content">
            Sign up
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
          <button type="submit" className="ui green submit button">Sign up</button>
        </div>
      </form>
    );
  },
  register: function (e) {
    e.preventDefault();
  
    const username = $(this.refs.username).val();
    const email = $(this.refs.email).val();
    const password = $(this.refs.password).val();

    this.props.register(username, email, password);
  }
});