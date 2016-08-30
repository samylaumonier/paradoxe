import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { If, Then } from 'react-if';
import { Link } from 'react-router';

import './NavbarComponentStyle.less';

import { Notifications } from '/imports/api/collections/notifications';

import { NavabarNotificationItemComponent }from '/imports/ui/components/app/navbar/NavabarNotificationItemComponent/NotificationItemComponent'



const navbar = React.createClass({
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
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input className="prompt" placeholder="Search..." type="text"/>
              <i className="search link icon"/>
            </div>
            <div className="results"></div>
          </div>
  
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
  
              {this.props.notifications.map(notification => <NavabarNotificationItemComponent key={notification._id} user={this.props.user} notification={notification}/>)}
              
              <div className="item">
                <p className="center">Mark all as seen.</p>
              </div>
            
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
  userStatus: function () {
    const status = this.props.contact.status;
    
    if (!status) {
      return 'gray';
    } else if (status.idle) {
      return 'orange';
    } else if (status.online) {
      return 'green';
    } else {
      return 'gray';
    }
  },
  logout: function () {
    Meteor.logout();
  }
});

function composer(props, onData) {
  const invitesSubscription = Meteor.subscribe('navbar.invites');
  const notificationSubscription = Meteor.subscribe('navbar.notifications');
  
  if (invitesSubscription.ready() && notificationSubscription.ready()) {
    const invites = Counts.get('navbar.invites');
    const user = Meteor.user();
  
    let notifications = Notifications.find({
      userId: user._id
      },{
        sort: {
          createdAt: -1
        }
      }).fetch();
  
    onData(null, {
      hasNotifications: notifications.length > 0,
      notificationCount: notifications.length,
      notifications,
      hasInvites: invites > 0,
      invites
    });
  }
}

export const NavbarComponent = composeWithTracker(composer)(navbar);
