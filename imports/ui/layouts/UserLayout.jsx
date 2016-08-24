import React from 'react';

import { SidebarComponent } from '../components/SidebarComponent/SidebarComponent';

export const UserLayout = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  componentDidMount: function () {
    $.fn.api.settings.api = {
      'search users': '/users/search/?username={username}'
    };
  },
  render: function () {
    return (
      <div>
        <SidebarComponent />
        <div className="pusher">
          {this.props.children}
        </div>
      </div>
    );
  }
});
