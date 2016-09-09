import React from 'react';

import { SidebarContainer } from '/imports/ui/containers/parts/app/sidebar/SidebarContainer';
import { NavbarContainer } from '/imports/ui/containers/parts/app/navbar/NavbarContainer';
import { AddContactsModalContainer } from '/imports/ui/containers/parts/app/modals/AddContactsModalContainer';

export const UserLayoutComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    user: React.PropTypes.object.isRequired,
    onInit: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.onInit(this.props.user);
  },
  componentDidMount: function () {
    $.fn.api.settings.api = {
      'search users': '/users/search/?username={username}'
    };
  },
  render: function () {
    return (
      <div>
        <SidebarContainer />
        <div className="user-layout">
          <NavbarContainer />
          {this.props.children}
        </div>
        <AddContactsModalContainer />
        <div id="modals"></div>
        <div id="popups"></div>
      </div>
    );
  }
});
