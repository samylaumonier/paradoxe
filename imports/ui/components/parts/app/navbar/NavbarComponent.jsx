import React from 'react';
import { Link } from 'react-router';

import '/imports/ui/styles/parts/app/navbar/NavbarComponentStyle.less';

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
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.notifications && nextProps.notifications.length > this.props.notifications.length) {
      this.playSound(this.refs.notificationSound);
    }
  },
  playSound: function (audio) {
    audio.currentTime = 0;
    audio.play();
  },
  render: function () {
    const totalInvites = this.props.hasInvites
      ? <span className="ui mini green circular label navbar-label">{this.props.totalInvites}</span>
      : null;

    const totalNotifications = this.props.hasNotifications
      ? <span className="ui mini green circular label navbar-label">{this.props.totalNotifications}</span>
      : null;

    const notificationsHelper = this.props.hasNotifications
      ? <p className="center">Mark all as seen.</p>
      : <p className="center">No notifications.</p>;

    return (
      <div id="navbar">
        <div className="ui top attached secondary menu">
          <a className="ui item" onClick={this.openContactAddModal}>
            <i className="add user icon"/>
            &nbsp; Add contacts
          </a>
          <Link className="ui icon item" to="/invites">
            <i className="users icon"/>
            &nbsp; Invites {totalInvites}
          </Link>
          <div className="right menu">
            <div ref="notification" className="ui dropdown icon item">
              <i className="bell icon"/>
              &nbsp; {totalNotifications}
              <div className="menu">
                {this.props.notifications.map(notification =>
                  <NavbarNotificationItemContainer key={notification._id} notification={notification}/>
                )}
                <div className="item">
                  {notificationsHelper}
                </div>
              </div>
            </div>
            <div ref="profile" className="ui dropdown icon item">
              <i className="user icon"/>
              <div className="menu">
                <a className="item"><i className="life ring icon"/> Help</a>
                <a className="item"><i className="external icon"/> Feedback</a>
                <a className="item" href="/change-password"><i className="lock icon"/> change password</a>
                <a className="item" onClick={this.props.logout}>
                  <i className="sign out icon"/>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <audio src="/sounds/notification.mp3" hidden ref="notificationSound"/>
      </div>
    );
  },
  openContactAddModal: function (event) {
    event.preventDefault();
    $('#contact-add-modal').modal('show');
  },
});
