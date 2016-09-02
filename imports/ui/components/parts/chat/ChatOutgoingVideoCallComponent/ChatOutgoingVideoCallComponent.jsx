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
    onDecline: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onMissed: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.setState({
      declined: this.props.message.declined,
      missed: this.props.message.missed,
    });
  },
  componentDidUpdate: function () {
    if (this.props.message.status === DECLINED_STATUS && !this.state.declined) {
      this.setState({
        declined: true
      }, () => {
        this.props.onDecline(this.props.message);
      });
    } else if (this.props.message.status === MISSED_STATUS && !this.state.missed) {
      this.setState({
        missed: true
      }, () => {
        this.props.onMissed(this.props.message);
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
              <button className="ui labeled icon button" onClick={this.onCancel}>
                <i className="remove icon"/>
                Cancel
              </button>
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
  onCancel: function () {
    this.props.onCancel(this.props.message);
  },
});
