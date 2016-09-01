import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { If, Then, Else } from 'react-if';

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
    return (
      <div id="chat-sidebar">
        <If condition={this.props.contactStream === null}>
          <Then>
            <ChatSidebarAvatarComponent
              position="top"
              user={this.props.contact}
            />
          </Then>
          <Else>
            <PartnerVideoComponent
              user={this.props.user}
              stream={this.props.contactStream}
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
