import React from 'react';

import { Switch, Case } from 'jsx-switch';

import { CONTACT_REQUEST, REQUEST_ACCEPTED, MISSED_CALL } from '/imports/api/collections/notifications';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

export const NavbarNotificationItemComponent = React.createClass({
  propTypes: {
    notification: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    markNotificationSeen: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div>
        <div className="item" onClick={this.props.markNotificationSeen}>
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
              <p className="header">Tried to contact you.</p>
            </Case>
          </Switch>
        </div>
      </div>
    );
  },
});
