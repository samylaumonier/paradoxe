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
        <ChatSidebarAvatarComponent position="top" image="http://semantic-ui.com/images/avatar2/large/matthew.png" user={this.props.user} />
        <ChatSidebarAvatarComponent position="bottom" image="http://semantic-ui.com/images/avatar2/large/molly.png" user={this.props.contact} />
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
