import React from 'react';
import { Switch, Case, Default } from 'jsx-switch';

import {
  ANSWERED_STATUS,
  CANCELED_STATUS,
  DECLINED_STATUS,
  MISSED_STATUS,
  RINGING_STATUS
} from '/imports/api/collections/messages';

export const ChatOutgoingVideoCallComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    videoCallDeclined: React.PropTypes.func.isRequired,
    videoCallMissed: React.PropTypes.func.isRequired,
    cancelVideoCall: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      declined: this.props.message.declined,
      missed: this.props.message.missed,
    };
  },
  componentWillMount: function () {
    this.updateMessage();
  },
  componentDidUpdate: function () {
    this.updateMessage();
  },
  updateMessage: function () {
    if (this.props.message.status === DECLINED_STATUS && !this.state.declined) {
      this.setState({
        declined: true,
      }, () => {
        this.props.videoCallDeclined();
      });
    } else if (this.props.message.status === MISSED_STATUS && !this.state.missed) {
      this.setState({
        missed: true,
      }, () => {
        this.props.videoCallMissed();
      });
    }
  },
  render: function () {
    return (
      <div>
        <Switch>
          <Case expr={this.props.message.status === RINGING_STATUS}>
            <span>
              You are making a video call to {this.props.contact.username}.
              <button className="ui labeled icon button" onClick={this.props.cancelVideoCall}>
                <i className="remove icon"/>
                Cancel
              </button>
              <audio src="/sounds/outgoing.ogg" autoPlay hidden loop/>
            </span>
          </Case>
          <Case expr={this.props.message.status === ANSWERED_STATUS}>
            <span>Video call answered.</span>
          </Case>
          <Case expr={this.props.message.status === DECLINED_STATUS}>
            <span>{this.props.contact.username} has declined your video call.</span>
          </Case>
          <Case expr={this.props.message.status === CANCELED_STATUS}>
            <span>You canceled the video call.</span>
          </Case>
          <Case expr={this.props.message.status === MISSED_STATUS}>
            <span>{this.props.contact.username} missed the video call.</span>
          </Case>
          <Default>
            <span>An error occurred. Please try again.</span>
          </Default>
        </Switch>
      </div>
    );
  },
});
