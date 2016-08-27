import React from 'react';

import { AvatarComponent } from '../AvatarComponent/AvatarComponent';

import './ChatSidebarAvatarComponentStyle.less';

export const ChatSidebarAvatarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className={"chat-sidebar-avatar " + this.props.position}>
        <AvatarComponent user={this.props.user} className={"avatar-image " + this.userStatus()} size={280}/>
      </div>
    );
  },
  userStatus: function () {
    const status = this.props.user.status;

    if (!status) {
      return 'offline';
    } else if (status.idle) {
      return 'idle';
    } else if (status.online) {
      return 'online';
    } else {
      return 'offline';
    }
  }
});
