import React from 'react';
import { If, Then } from 'react-if';

import { SidebarContainer } from '/imports/ui/containers/parts/app/sidebar/SidebarContainer';
import { NavbarContainer } from '/imports/ui/containers/parts/app/navbar/NavbarContainer';
import { AddContactsModalContainer } from '/imports/ui/containers/parts/app/modals/AddContactsModalContainer';

export const UserLayoutComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    user: React.PropTypes.object.isRequired,
    loadUser: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadUser();
  },
  componentDidMount: function () {
    $.fn.api.settings.api = {
      'search users': '/users/search/?username={username}'
    };
  },
  render: function () {
    return (
      <div>
        <If condition={this.props.user.ready === true}>
          <Then>
            <div>
              <SidebarContainer />
              <div className="user-layout">
                <NavbarContainer />
                {this.props.children}
              </div>
              <AddContactsModalContainer />
            </div>
          </Then>
        </If>
        <div id="modals"></div>
        <div id="popups"></div>
      </div>
    );
  }
});
