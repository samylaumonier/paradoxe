import React from 'react';
import { composeWithTracker } from 'react-komposer';

const avatar = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },
  render: function () {
    return (
      <img
        src={this.props.src}
        className={this.props.className || ''}
      />
    );
  }
});

function composer(props, onData) {
  onData(null, {
    src: `https://secure.gravatar.com/avatar/${props.user.profile.emailHash}?s=${props.size}&d=identicon`,
    className: props.className || ''
  });
}

export const AvatarComponent = composeWithTracker(composer)(avatar);
