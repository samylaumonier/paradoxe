import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { Switch, Case, Default } from 'jsx-switch';
import {
  ANSWERED_STATUS,
  CANCELED_STATUS,
  DECLINED_STATUS,
  MISSED_STATUS,
  RINGING_STATUS
} from '/imports/api/collections/messages';

const component = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    onAnswer: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div>
        <Switch>
          <Case expr={this.props.message.status === RINGING_STATUS}>
            <span>
              {this.props.contact.username} wants to start a video call.
              <button className="ui labeled icon button" onClick={this.onAnswer}>
                <i className="record icon" />
                Answer
              </button>
              <button className="ui labeled icon button" onClick={this.onDecline}>
                <i className="remove icon" />
                Decline
              </button>
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
  onAnswer: function () {
    this.props.onAnswer(this.props.message);
  },
  onDecline: function () {
    Meteor.call('updateVideoCallStatus', this.props.message._id, DECLINED_STATUS);
  },
});

function composer(props, onData) {
  onData(null, {
    props
  });
}

export const ChatIncomingVideoCallComponent = composeWithTracker(composer)(component);
