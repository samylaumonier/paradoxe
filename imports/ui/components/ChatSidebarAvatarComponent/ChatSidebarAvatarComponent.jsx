import React from 'react';

import { getUserStatus } from '/imports/api/collections';
import { AvatarComponent } from '../AvatarComponent/AvatarComponent';

import './ChatSidebarAvatarComponentStyle.less';

export const ChatSidebarAvatarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className={"chat-sidebar-avatar " + this.props.position}>
        <AvatarComponent user={this.props.user} className={"avatar-image " + getUserStatus(this.props.user.status)} size={280}/>
      </div>
    );
  }
});
