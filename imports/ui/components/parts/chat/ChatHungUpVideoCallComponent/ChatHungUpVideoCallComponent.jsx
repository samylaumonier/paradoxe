import React from 'react';

export const ChatHungUpVideoCallComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    videoCallHungUp: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    if (!this.props.message.hungUp && this.props.message.targetUserId.includes(this.props.user._id)) {
      this.props.videoCallHungUp(this.props.message);
    }
  },
  render: function () {
    const message = this.props.message.hungUpByUserId === this.props.contact._id
      ? <span>{this.props.contact.username} has hung up the video call.</span>
      : <span>You have hung up the video call.</span>;

    return (
      <div>
        {message}
      </div>
    );
  },
});
