import React from 'react';
import { composeWithTracker } from 'react-komposer';

const component = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div>
        <button>cancel</button>
      </div>
    );
  }
});

function composer(props, onData) {
  onData(null, {
    message: props.message
  });
}

export const ChatOutgoingVideoCallComponent = composeWithTracker(composer)(component);
