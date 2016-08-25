import React from 'react';

import { SidebarComponent } from '../components/SidebarComponent/SidebarComponent';
import { NavbarComponent } from '../components/NavbarComponent/NavbarComponent';

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
        <div className="userLayout">
          <NavbarComponent />
          {this.props.children}
        </div>
        <div id="modals"></div>
      </div>
    );
  }
});
