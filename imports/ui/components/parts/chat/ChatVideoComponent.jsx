import React from 'react';
import YouTube from 'react-youtube';

import '/imports/ui/styles/parts/chat/ChatVideoComponentStyle.less';

export const ChatVideoComponent = React.createClass({
  propTypes: {
    contactId: React.PropTypes.string.isRequired,
    messageId: React.PropTypes.string.isRequired,
    video: React.PropTypes.object.isRequired,
    onVideoReady: React.PropTypes.func.isRequired,
    onVideoPlay: React.PropTypes.func.isRequired,
    onVideoPause: React.PropTypes.func.isRequired,
    onSetWatchTogether: React.PropTypes.func.isRequired,
  },
  render: function () {
    const player = <YouTube
      videoId={this.props.video.id}
      onReady={this.props.onVideoReady}
      onPlay={this.props.onVideoPlay}
      onPause={this.props.onVideoPause}
    />;

    return (
      <div className="video">
        {player}
        <div className="ui toggle checkbox">
          <input
            type="checkbox"
            name="public"
            checked={this.props.video.watchTogether}
            onChange={this.props.onSetWatchTogether}
          />
          <label>Watch together</label>
        </div>
      </div>
    );
  },
});
