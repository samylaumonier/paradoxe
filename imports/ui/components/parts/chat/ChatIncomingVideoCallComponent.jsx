import React from 'react';
import { Switch, Case, Default } from 'jsx-switch';

import {
  ANSWERED_STATUS,
  CANCELED_STATUS,
  DECLINED_STATUS,
  MISSED_STATUS,
  RINGING_STATUS
} from '/imports/api/collections/messages';

export const ChatIncomingVideoCallComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    answerVideoCall: React.PropTypes.func.isRequired,
    declineVideoCall: React.PropTypes.func.isRequired,
    videoCallRinging: React.PropTypes.func.isRequired,
    videoCallMissed: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.updateState();
  },
  componentDidUpdate: function () {
    this.updateState();
  },
  updateState: function () {
    if (this.props.message.status === RINGING_STATUS) {
      this.props.videoCallRinging();
    } else if (this.props.message.status === MISSED_STATUS) {
      this.props.videoCallMissed();
    }
  },
  render: function () {
    return (
      <div>
        <Switch>
          <Case expr={this.props.message.status === RINGING_STATUS}>
            <span>
              {this.props.contact.username} wants to start a video call.
              <button className="ui labeled icon button" onClick={this.props.answerVideoCall}>
                <i className="record icon" />
                Answer
              </button>
              <button className="ui labeled icon button" onClick={this.props.declineVideoCall}>
                <i className="remove icon" />
                Decline
              </button>
              <audio src="/sounds/incoming.mp3" autoPlay hidden loop/>
            </span>
          </Case>
          <Case expr={this.props.message.status === ANSWERED_STATUS}>
            <span>Video call answered.</span>
          </Case>
          <Case expr={this.props.message.status === DECLINED_STATUS}>
            <span>You declined the video call.</span>
          </Case>
          <Case expr={this.props.message.status === CANCELED_STATUS}>
            <span>{this.props.contact.username} canceled the video call.</span>
          </Case>
          <Case expr={this.props.message.status === MISSED_STATUS}>
            <span>You missed a video call.</span>
          </Case>
          <Default>
            <span>An error occurred. Please try again.</span>
          </Default>
        </Switch>
      </div>
    );
  },
});
