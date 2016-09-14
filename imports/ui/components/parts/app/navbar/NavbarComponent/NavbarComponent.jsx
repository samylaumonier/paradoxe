import React from 'react';
import { If, Then, Else } from 'react-if';
import { Link } from 'react-router';

import './NavbarComponentStyle.less';

import { NavbarNotificationItemContainer } from '/imports/ui/containers/parts/app/navbar/NavbarNotificationItemContainer';

export const NavbarComponent = React.createClass({
  propTypes: {
    hasInvites: React.PropTypes.bool.isRequired,
    totalInvites: React.PropTypes.number.isRequired,
    loadInvites: React.PropTypes.func.isRequired,
    hasNotifications: React.PropTypes.bool.isRequired,
    totalNotifications: React.PropTypes.number.isRequired,
    notifications: React.PropTypes.array.isRequired,
    loadNotifications: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadInvites();
    this.props.loadNotifications();
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
                {this.props.totalInvites}
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
                  {this.props.totalNotifications}
                </span>
              </Then>
            </If>
            <i className="dropdown icon"/>
            <div id="notifications-menu" className="menu">
              {this.props.notifications.map(notification =>
                <NavbarNotificationItemContainer
                  key={notification._id}
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
            &nbsp; <i className="dropdown icon"/>
            <div className="menu">
              <div className="item"><i className="life ring icon"/> Help</div>
              <div className="item"><i className="external icon"/> Feedback</div>
              <a className="item" onClick={this.props.logout}>
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
});
