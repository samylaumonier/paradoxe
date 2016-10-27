import React from 'react';
import Notifications from 'react-notification-system-redux';
import { Electron } from 'meteor/risetechnologies:electron-builder-local';

import { SidebarContainer } from '/imports/ui/containers/parts/app/sidebar/SidebarContainer';
import { NavbarContainer } from '/imports/ui/containers/parts/app/navbar/NavbarContainer';
import { ChatVideosContainer } from '/imports/ui/containers/parts/chat/ChatVideosContainer';
import { AddContactsModalContainer } from '/imports/ui/containers/parts/app/modals/AddContactsModalContainer';
import { CreateGroupModalContainer } from '/imports/ui/containers/parts/app/modals/CreateGroupModalContainer';

import '/imports/ui/styles/layout/UserLayoutComponentStyle.less';

export const UserLayoutComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    user: React.PropTypes.object.isRequired,
    loadUser: React.PropTypes.func.isRequired,
    notifications: React.PropTypes.array.isRequired,
  },
  componentWillMount: function () {
    this.props.loadUser();
  },
  componentDidMount: function () {
    $.fn.api.settings.api = {
      'search users': '/users/search/?username={username}',
      'search contacts': '/contacts/search/?username={username}',
    };

    if (Electron.isElectron()) {
      $('body').on('click', '.url', e => {
        e.preventDefault();
        Electron.openExternal($(e.target).attr('href'));
      });
    }
  },
  render: function () {
    const children = this.props.user.ready ?
      <div>
        <SidebarContainer />
        <div id="user-layout">
          <NavbarContainer />
          {this.props.children}
        </div>
        <AddContactsModalContainer/>
        <CreateGroupModalContainer/>
      </div> : null;

    return (
      <div>
        {children}
        <div id="modals"></div>
        <div id="popups"></div>
        <Notifications notifications={this.props.notifications}/>
        <ChatVideosContainer/>
      </div>
    );
  },
});
