import React from 'react';

export const ForgotPasswordPageComponent = React.createClass({
  propTypes: {
    forgot: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div className="ui bottom attached center segment">
        <h1>Forgot your password ?</h1>
        <div className="ui form segment">
          <div className="field">
            <label>Email</label>
            <div className="ui left labeled icon input">
              <input ref="email" type="email" required/>
              <i className="mail icon"/>
            </div>
            <div className="ui green submit button" onClick={this.forgot}>Send email</div>
          </div>
        </div>
      </div>
    );
  },
  forgot: function () {
    this.props.forgot(this.refs.email.value);
  }
});
