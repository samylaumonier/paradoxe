import React from 'react';

import './ChatSidebarAvatarComponentStyle.less';

export const ChatSidebarAvatarComponent = React.createClass({
  render: function () {
    return (
      <div className={"chat-sidebar-avatar " + this.props.position}>
        <img className={"ui fluid image avatar-image online" } src={this.props.image} />
      </div>
    );
  },
  userStatus: function (status) {
    console.log(status);
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
