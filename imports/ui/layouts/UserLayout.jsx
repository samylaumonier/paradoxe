import React from 'react';

import { SidebarComponent } from '../components/SidebarComponent/SidebarComponent';
import { NavbarComponent } from '../components/NavbarComponent/NavbarComponent';
import { SidebarContactAddComponent } from '../components/SidebarContactAddComponent/SidebarContactAddComponent';

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
        <SidebarContactAddComponent />
        <div id="modals"></div>
      </div>
    );
  }
});
