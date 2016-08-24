import React from 'react';

import './VideoZoneComponentStyle.css';

import { VideoPeer } from '/imports/api/VideoPeer';

import { PartnerVideoComponent } from './PartnerVideoComponent/PartnerVideoComponent';
import { MyVideoComponent } from './MyVideoComponent/MyVideoComponent';
import { CallZoneComponent } from './CallZoneComponent/CallZoneComponent';
import { HangUpComponent } from './HangUpComponent/HangUpComponent';
import { ChatComponent } from './ChatComponent/ChatComponent';

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
