import React from 'react';
import YouTube from 'react-youtube';
import Slider from 'react-rangeslider';

import '/imports/ui/styles/parts/chat/ChatVideoComponentStyle.less';

const playerOptions = {
  playerVars: {
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    rel: 0,
  },
};

export const ChatVideoComponent = React.createClass({
  propTypes: {
    contactId: React.PropTypes.string.isRequired,
    videoId: React.PropTypes.string.isRequired,
    focused: React.PropTypes.bool.isRequired,
    playing: React.PropTypes.bool.isRequired,
    muted: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    duration: React.PropTypes.number.isRequired,
    currentTime: React.PropTypes.number.isRequired,
    onReady: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onPlay: React.PropTypes.func.isRequired,
    onPause: React.PropTypes.func.isRequired,
    onSeekTo: React.PropTypes.func.isRequired,
    onPlayed: React.PropTypes.func.isRequired,
    onPaused: React.PropTypes.func.isRequired,
    onUnMute: React.PropTypes.func.isRequired,
    onMute: React.PropTypes.func.isRequired,
  },
  render: function () {
    const playOrPause = this.props.playing
      ? <div className="ui icon button" onClick={this.props.onPause}>
        <i className="pause icon"/>
      </div>
      : <div className="ui icon button" onClick={this.props.onPlay}>
        <i className="play icon"/>
      </div>;

    const muteOrUnMute = this.props.muted
      ? <div className="ui icon button" onClick={this.props.onUnMute}>
        <i className="volume off icon"/>
      </div>
      : <div className="ui icon button" onClick={this.props.onMute}>
        <i className="volume up icon"/>
      </div>;

    return (
      <div className={`video ${this.props.focused ? 'focused' : ''}`}>
        <div className="title handle">
          {this.props.title}
          <div className="ui icon button" onClick={this.props.onClose}>
            <i className="remove icon"/>
          </div>
        </div>
        <div onClick={this.props.playing ? this.props.onPause : this.props.onPlay}>
          <YouTube
            opts={playerOptions}
            className="player"
            onReady={this.props.onReady}
            videoId={this.props.videoId}
            onPlay={this.props.onPlayed}
            onPause={this.props.onPaused}
          />
        </div>
        <div className="controls">
          <Slider
            max={this.props.duration}
            step={0.00000000000000001}
            value={this.props.currentTime}
            onChange={this.props.onSeekTo}
          />
          <div className="handle">
            {playOrPause}
            {muteOrUnMute}
            <div className="right">
              <a
                className="ui icon button"
                href={`https://www.youtube.com/watch?v=${this.props.videoId}`}
                target="_blank"
                rel="noopener"
              >
                <i className="youtube icon"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
