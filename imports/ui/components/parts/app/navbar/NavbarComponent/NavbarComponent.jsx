import React from 'react';
import { If, Then, Else } from 'react-if';
import { Link } from 'react-router';

import './NavbarComponentStyle.less';

import { NavbarNotificationItemContainer } from '/imports/ui/containers/parts/app/navbar/NavbarNotificationItemContainer';

export const NavbarComponent = React.createClass({
  propTypes: {
    notifications: React.PropTypes.array
  },
  componentDidMount: function () {
    $(this.refs.profile).dropdown();
    $(this.refs.notification).dropdown();
  },
  render: function () {
    return (
      <div className="ui top attached menu">
        <a className="ui icon item" onClick={this.openContactAddModal}>
          <i className="add user icon"/>
          &nbsp; Add contacts
        </a>
        <Link className="ui icon item" to="/invites">
          <i className="users icon"/>
          &nbsp; Invites
          <If condition={this.props.hasInvites}>
            <Then>
              <span className="ui mini green circular label navbar-label">
                {this.props.invites}
              </span>
            </Then>
          </If>
        </Link>
        
        <div className="right menu">
          <div ref="notification" className="ui pointing dropdown icon item">
            <i className="bell icon"/>
            &nbsp; Notification
            <If condition={this.props.hasNotifications}>
              <Then>
                <span className="ui mini green circular label navbar-label">
                  {this.props.notificationCount}
                </span>
              </Then>
            </If>
            <i className="dropdown icon"/>
            <div id="notifications-menu" className="menu">
              {this.props.notifications.map(notification =>
                <NavbarNotificationItemContainer
                  key={notification._id}
                  user={this.props.user}
                  notification={notification}
                />
              )}
              <If condition={this.props.hasNotifications}>
                <Then>
                  <div className="item">
                    <p className="center">Mark all as seen.</p>
                  </div>
                </Then>
                <Else>
                  <div className="item">
                    <p className="center">No notifications.</p>
                  </div>
                </Else>
              </If>
            </div>
          </div>
          
          <div ref="profile" className="ui pointing dropdown icon item">
            <i className="user icon"/>
            &nbsp; Profile <i className="dropdown icon"/>
            <div className="menu">
              <div className="item"><i className="life ring icon"/> Help</div>
              <div className="item"><i className="share icon"/> Feedback</div>
              <a className="item"><i className="setting icon"/> Settings</a>
              <a className="item" onClick={this.logout}>
                <i className="sign out icon"/>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
  openContactAddModal: function (event) {
    event.preventDefault();
    $('#contact-add-modal').modal('show');
  },
  logout: function () {
    Meteor.logout();
  }
});
