import React from 'react';

export const ChatNudgeComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
  },
  render: function () {
    const message = this.props.message.sender.includes(this.props.contact._id)
      ? <span>{this.props.contact.username} sent you a nudge.</span>
      : <span>You sent a nudge.</span>;

    return (
      <div>
        {message}
      </div>
    );
  },
});
