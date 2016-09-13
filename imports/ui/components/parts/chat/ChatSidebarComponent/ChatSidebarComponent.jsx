import React from 'react';

import { ChatSidebarAvatarComponent } from '/imports/ui/components/parts/chat/ChatSidebarAvatarComponent/ChatSidebarAvatarComponent';
import { PartnerVideoComponent } from '/imports/ui/components/parts/video/PartnerVideoComponent/PartnerVideoComponent';
import { MyVideoComponent } from '/imports/ui/components/parts/video/MyVideoComponent/MyVideoComponent';

import './ChatSidebarComponentStyle.less';

export const ChatSidebarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    stream: React.PropTypes.object,
    contactStream: React.PropTypes.object,
  },
  render: function () {
    const contact = !this.props.contactStream
      ? <ChatSidebarAvatarComponent position="top" user={this.props.contact}/>
      : <PartnerVideoComponent user={this.props.user} stream={this.props.contactStream}/>;

    const user = !this.props.stream
      ? <ChatSidebarAvatarComponent position="bottom" user={this.props.user}/>
      : <MyVideoComponent user={this.props.user} stream={this.props.stream}/>;

    return (
      <div id="chat-sidebar">
        {contact}
        {user}
      </div>
    );
  },
});
