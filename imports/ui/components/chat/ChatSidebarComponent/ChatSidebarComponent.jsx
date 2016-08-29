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
    onVideoCall: React.PropTypes.bool.isRequired,
    startUserVideo: React.PropTypes.func.isRequired,
    ringing: React.PropTypes.bool.isRequired,
    startPartnerVideo: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div id="chat-sidebar">
        <If condition={this.props.ringing}>
          <Then>
            <PartnerVideoComponent user={this.props.user} startPartnerVideo={this.props.startPartnerVideo}/>
          </Then>
          <Else>
            <ChatSidebarAvatarComponent position="top" user={this.props.contact} />
          </Else>
        </If>
        <If condition={this.props.onVideoCall || this.props.ringing}>
          <Then>
            <MyVideoComponent user={this.props.user} startUserVideo={this.props.startUserVideo}/>
          </Then>
          <Else>
            <ChatSidebarAvatarComponent position="bottom" user={this.props.user} />
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
