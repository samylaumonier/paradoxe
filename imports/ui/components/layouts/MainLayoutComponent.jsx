import React from 'react';

import Notifications from 'react-notification-system-redux';

export const MainLayoutComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    notifications: React.PropTypes.array.isRequired,
  },
  
  render: function () {
    return (
      <div className="container">
        {this.props.children}
        <Notifications notifications={this.props.notifications}/>
      </div>
    );
  }
});
