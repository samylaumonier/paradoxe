import React from 'react';

export const NavbarComponent = React.createClass({
  render: function () {
    return (
      <div className="ui top attached menu">
        <div className="ui dropdown icon item">
          <i className="wrench icon" />
          <div className="menu">
            <div className="item">
              <i className="dropdown icon" />
              <span className="text">New</span>
              <div className="menu">
                <div className="item">Document</div>
                <div className="item">Image</div>
              </div>
            </div>
            <div className="item">
              Open...
            </div>
            <div className="item">
              Save...
            </div>
            <div className="item">Edit Permissions</div>
            <div className="divider"></div>
            <div className="header">
              Export
            </div>
            <div className="item">
              Share...
            </div>
          </div>
        </div>
        <div className="right menu">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input className="prompt" placeholder="Search animals..." type="text" />
              <i className="search link icon" />
            </div>
            <div className="results"></div>
          </div>
        </div>
      </div>
    );
  }
});
