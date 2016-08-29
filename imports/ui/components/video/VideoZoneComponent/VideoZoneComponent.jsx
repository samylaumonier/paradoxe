import React from 'react';

import './VideoZoneComponentStyle.less';

import { VideoPeer } from '/imports/api/VideoPeer';

import { PartnerVideoComponent } from '/imports/ui/components/video/PartnerVideoComponent/PartnerVideoComponent';
import { MyVideoComponent } from '/imports/ui/components/video/MyVideoComponent/MyVideoComponent';
import { CallZoneComponent } from '/imports/ui/components/video/CallZoneComponent/CallZoneComponent';
import { HangUpComponent } from '/imports/ui/components/video/HangUpComponent/HangUpComponent';
import { ChatComponent } from '/imports/ui/components/chat/ChatComponent/ChatComponent';

export const VideoZoneComponent = React.createClass({
  getInitialState: function () {
    const videoPeer = new VideoPeer();

    videoPeer.run({
      onOpen: id => {
        this.setState({
          id
        });
      }
    });

    return {
      id: '',
      videoPeer
    };
  },
  render: function () {
    return (
      <div id="videozone" className="row-fluid">
        <span>{this.state.id}</span>
        <div className="span9">
          <PartnerVideoComponent />
        </div>
        <div className="span3 row-fluid">
          <MyVideoComponent />
          <CallZoneComponent videoPeer={this.state.videoPeer} />
          <HangUpComponent videoPeer={this.state.videoPeer} />
          <ChatComponent />
        </div>
      </div>
    );
  }
});
