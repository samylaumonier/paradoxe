import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { ChatSidebarAvatarComponent } from '../ChatSidebarAvatarComponent/ChatSidebarAvatarComponent';

import './ChatSidebarComponentStyle.less';

const sidebar = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object,
    contact: React.PropTypes.object
  },
  render: function () {
    return (
      <div id="chat-sidebar">
        <ChatSidebarAvatarComponent position="top" />
        <ChatSidebarAvatarComponent position="bottom" />
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
