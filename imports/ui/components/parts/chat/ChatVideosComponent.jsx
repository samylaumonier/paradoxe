import React from 'react';
import Draggable from 'react-draggable';

import { ChatVideoContainer } from '/imports/ui/containers/parts/chat/ChatVideoContainer';

export const ChatVideosComponent = React.createClass({
  propTypes: {
    videos: React.PropTypes.array.isRequired,
    onReady: React.PropTypes.func.isRequired,
    onStartDrag: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.props.onReady();
  },
  render: function () {
    const videos = this.props.videos.map(props =>
      <Draggable
        key={`${props.contactId}-${props.videoId}`}
        handle=".handle"
        cancel=".ui.button"
        defaultPosition={{x: 25, y: 25}}
        zIndex={props.focused ? 201 : 200}
        bounds="body"
        onStart={this.props.onStartDrag}
      >
        <div data-contact-id={props.contactId} data-video-id={props.videoId}>
          <ChatVideoContainer {...props}/>
        </div>
      </Draggable>
    );

    return (
      <div id="videos">
        {videos}
      </div>
    );
  },
});
