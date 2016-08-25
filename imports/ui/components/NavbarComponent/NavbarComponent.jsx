import React from 'react';

import { Link } from 'react-router';

export const NavbarComponent = React.createClass({
  render: function () {
    return (
      <div className="ui top attached menu">
        <Link className="ui icon item" to="/invites">
          <i className="add user icon" />
          &nbsp; Invites
          <span className="ui mini green circular label">12</span>
        </Link>
        <div className="right menu">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input className="prompt" placeholder="Search..." type="text" />
              <i className="search link icon" />
            </div>
            <div className="results"></div>
          </div>
        </div>
      </div>
    );
  }
});
