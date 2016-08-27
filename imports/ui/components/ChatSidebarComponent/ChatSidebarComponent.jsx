import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { ChatSidebarAvatarComponent } from '../ChatSidebarAvatarComponent/ChatSidebarAvatarComponent';

import './ChatSidebarComponentStyle.less';

const sidebar = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div id="chat-sidebar">
        <ChatSidebarAvatarComponent position="top" user={this.props.contact} />
        <ChatSidebarAvatarComponent position="bottom" user={this.props.user} />
      </div>
    );
  }
});

function composer(props, onData) {
  onData(null, {
    props
  });
}

export const ChatSidebarComponent = composeWithTracker(composer)(sidebar);
