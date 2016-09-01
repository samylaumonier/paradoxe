import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

export const NavbarNotificationItemComponent = React.createClass({
  propTypes: {
    notification: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },
  render: function () {
    return (
    <a className="item">
      <AvatarComponent user={this.props.user} className={"ui avatar image"} size={22}/>
      <b className="username">{this.props.user.username}</b>
      <p className="header">Has sent you a message.</p>
    </a>
    );
  },
});
