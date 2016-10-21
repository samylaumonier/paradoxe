import React from 'react';
import { Link } from 'react-router';
import { Electron } from 'meteor/risetechnologies:electron-builder-local';

import '/imports/ui/styles/parts/app/navbar/NavbarComponentStyle.less';

import { NavbarNotificationItemContainer } from '/imports/ui/containers/parts/app/navbar/NavbarNotificationItemContainer';

export const NavbarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    hasInvites: React.PropTypes.bool.isRequired,
    totalInvites: React.PropTypes.number.isRequired,
    loadInvites: React.PropTypes.func.isRequired,
    hasNotifications: React.PropTypes.bool.isRequired,
    totalNotifications: React.PropTypes.number.isRequired,
    notifications: React.PropTypes.array.isRequired,
    loadNotifications: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    seeAll: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadInvites();
    this.props.loadNotifications();
  },
  componentDidMount: function () {
    $(this.refs.profile).dropdown({
      context: $('#app > div')
    });
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
    const version = Meteor.settings.public.version;
    
    const download = !Electron.isElectron()
      ? <div className="item">
      <i className="left download icon"/>
      <span className="text">Download</span>
      <div className="left menu">
        <a href="https://download.paradoxe.io/download/latest/windows_64"
           className="item" download>Windows</a>
        <div className="divider"></div>
        <a href="https://download.paradoxe.io/download/latest/osx"
           className="item" download>Mac OS</a>
        <div className="divider"></div>
        <a href={`https://download.paradoxe.io/download/${version}/linux_64/paradoxe-${version}-amd64.deb`}
           className="item"
           download>Linux (.deb)
        </a>
        <a href={`https://download.paradoxe.io/download/${version}/linux_64/paradoxe-${version}-amd64.rpm`}
           className="item"
           download>Linux (.rpm)
        </a>
        <a href={`https://download.paradoxe.io/download/${version}/linux_64/paradoxe-${version}-amd64.tar.gz`}
           className="item"
           download>Linux (.tar.gz)
        </a>
      </div>
    </div> : null;
    
    const totalInvites = this.props.hasInvites
      ? <span className="ui mini green circular label navbar-label">{this.props.totalInvites}</span>
      : null;
    
    const totalNotifications = this.props.hasNotifications
      ? <span className="ui mini green circular label navbar-label">{this.props.totalNotifications}</span>
      : null;
    
    const notificationsHelper = this.props.hasNotifications
      ? <p className="center" onClick={this.props.seeAll}>Mark all as seen.</p>
      : <p className="center">No notifications.</p>;
    
    return (
      <div id="navbar">
        <div className="ui top attached secondary menu overlay">
          <a className="ui item toggle-button" onClick={this.toggleSidebar}>
            <i className="align justify icon"/>
          </a>
          <a className="ui item" onClick={this.openContactAddModal}>
            <i className="add user icon"/>
            <span className="visible-big-navbar">&nbsp; Add contacts</span>
          </a>
          <Link className="ui icon item" to="/invites">
            <i className="users icon"/>
            <span className="visible-big-navbar">&nbsp; Invites {totalInvites}</span>
          </Link>
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
          <div className="right menu">
            <div ref="profile" className="ui dropdown icon item">
              <i className="user icon visible-big-navbar"/>
              <span className="visible-big-navbar">&nbsp; {this.props.user.username}</span>
              <i className="ellipsis vertical icon visible-small-navbar"/>
              <div className="menu">
                <Link className="item" to="/settings">
                  <i className="settings icon"/> Settings
                </Link>
                {download}
                <Link className="item" to="/feedback">
                  <i className="external icon"/>
                  Feedback
                </Link>
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
  toggleSidebar: function () {
    $('.ui.left.sidebar').sidebar({
      context: $('#app > div'),
      mobileTransition: 'overlay',
      transition: 'overlay',
      overlay: true,
    }).sidebar('toggle');
  },
});
