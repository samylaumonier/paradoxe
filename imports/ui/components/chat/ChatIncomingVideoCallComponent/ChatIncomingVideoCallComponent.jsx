import React from 'react';
import { composeWithTracker } from 'react-komposer';

const component = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    onRinging: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.props.onRinging(this.props.message.callerVideoPeerId);
  },
  render: function () {
    return (
      <div>
        <button>answer</button>
        <button>decline</button>
      </div>
    );
  }
});

function composer(props, onData) {
  onData(null, {
    message: props.message
  });
}

export const ChatIncomingVideoCallComponent = composeWithTracker(composer)(component);
