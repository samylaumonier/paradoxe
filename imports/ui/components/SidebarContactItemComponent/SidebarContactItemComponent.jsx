import React from 'react';
import { browserHistory } from 'react-router';

import { AvatarComponent } from '../AvatarComponent/AvatarComponent';

export const SidebarContactItemComponent = React.createClass({
  render: function () {
    return (
      <div className="item" onClick={this.openChat}>
        <span className={"user-status mini ui empty circular label " + this.userStatus()}/>
        <AvatarComponent user={this.props.contact} className={"ui avatar image"} size={22}/>
        <div className="content">
          <div className="header">{this.props.contact.username}</div>
        </div>
      </div>
    );
  },
  openChat: function () {
    browserHistory.push(`/chat/${this.props.contact.username}`);
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
  }
});
