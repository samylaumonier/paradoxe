import React from 'react';

export const RegisterComponent = React.createClass({
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
                  <input id="register-username" type="text" placeholder="Username" required/>
                  <i className="user icon"/>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label>Email</label>
                <div className="ui left icon input">
                  <input id="register-email" type="email" placeholder="Email" required/>
                  <i className="at icon"/>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div className="field">
            <label>Password</label>
            <div className="ui left icon input">
              <input id="register-password" type="password" placeholder="Password" required/>
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
  
    const email = $('#register-email').val();
    const username = $('#register-username').val();
    const password = $('#register-password').val();
  
    Accounts.createUser({
      username: username,
      email:email,
      password: password
    }, function (err) {
      if(err){
        toastr.error(err.reason, "Error");
      }
      else{
        toastr.success("the user" + username  + " was created", "User created");
      }
    });
  }
});