import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory } from 'react-router';

import { Switch, Case } from 'jsx-switch';

import { CONTACT_REQUEST, REQUEST_ACCEPTED, MISSED_CALL } from '/imports/api/collections/notifications';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

export const NavbarNotificationItemComponent = React.createClass({
  propTypes: {
    notification: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },
  render: function () {
    return (
      <div>
        <div className="item" onClick={this.seen}>
          <AvatarComponent user={this.props.user} className={"ui avatar image"} size={22}/>
          <b className="username">{this.props.user.username}</b>
          <Switch>
            <Case expr={this.props.notification.tag === CONTACT_REQUEST}>
              <p className="header">Would like to be your contact.</p>
            </Case>
            <Case expr={this.props.notification.tag === REQUEST_ACCEPTED}>
              <p className="header">Has accepted your contact request.</p>
            </Case>
            <Case expr={this.props.notification.tag === MISSED_CALL}>
              <p className="header">Try to contact you.</p>
            </Case>
          </Switch>
        </div>
      </div>
    );
  },
  seen: function () {
    Meteor.call('notificationSeen', this.props.notification._id, err => {
      if(err){
        toastr.error(err.reason, 'Error');
      }
    });
    
    browserHistory.push(this.props.notification.url);
  }
});
