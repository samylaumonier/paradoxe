import React from 'react';

export const ChatNavbarComponent = React.createClass({
  render: function () {
    return (
      <div className="ui top attached menu">
          <span className="ui icon item">
            <i className="file icon"/>
          </span>
        <span className="ui icon item">
            <i className="game icon"/>
          </span>
        <span className="ui icon item">
            <i className="phone icon"/>
          </span>
        <span className="ui icon item">
            <i className="record icon"/>
          </span>
        <span className="ui icon item">
            <i className="gift icon"/>
          </span>
        <span className="ui icon item">
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner dont icon"/>
          </i>
          </span>
        <span className="ui icon item">
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner remove icon"/>
          </i>
          </span>
      </div>
    );
  },
});
