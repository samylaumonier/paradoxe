import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { If, Then, Else } from 'react-if';

import { ChatSidebarAvatarComponent } from '/imports/ui/components/chat/ChatSidebarAvatarComponent/ChatSidebarAvatarComponent';
import { PartnerVideoComponent } from '/imports/ui/components/video/PartnerVideoComponent/PartnerVideoComponent';
import { MyVideoComponent } from '/imports/ui/components/video/MyVideoComponent/MyVideoComponent';

import './ChatSidebarComponentStyle.less';

const sidebar = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    stream: React.PropTypes.object,
    call: React.PropTypes.object,
  },
  render: function () {
    return (
      <div id="chat-sidebar">
        <If condition={this.props.call === null}>
          <Then>
            <ChatSidebarAvatarComponent
              position="top"
              user={this.props.contact}
            />
          </Then>
          <Else>
            <PartnerVideoComponent
              user={this.props.user}
              call={this.props.call}
            />
          </Else>
        </If>
        <If condition={this.props.stream === null}>
          <Then>
            <ChatSidebarAvatarComponent
              position="bottom"
              user={this.props.user}
            />
          </Then>
          <Else>
            <MyVideoComponent
              user={this.props.user}
              stream={this.props.stream}
            />
          </Else>
        </If>
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
