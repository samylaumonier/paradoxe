import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { If, Else, Then } from 'react-if';

const component = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    onHangUp: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    if (!this.props.message.hungUp && this.props.message.targetUserId.includes(this.props.user._id)) {
      this.props.onHangUp(this.props.message);
    }
  },
  render: function () {
    return (
      <div>
        <If condition={this.props.message.hungUpByUserId === this.props.contact._id}>
          <Then>
            <span>{this.props.contact.username} has hung up the video call.</span>
          </Then>
          <Else>
            <span>You have hung up the video call.</span>
          </Else>
        </If>
      </div>
    );
  },
  onCancel: function () {
    this.props.onCancel(this.props.message._id);
  },
});

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      ...props,
      user
    });
  }
}

export const ChatHungUpVideoCallComponent = composeWithTracker(composer)(component);
