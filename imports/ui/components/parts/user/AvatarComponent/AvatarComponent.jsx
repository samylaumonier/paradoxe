import React from 'react';

export const AvatarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    size: React.PropTypes.number.isRequired,
    className: React.PropTypes.string
  },
  render: function () {
    return (
      <img
        src={`https://secure.gravatar.com/avatar/${this.props.user.profile.emailHash}?s=${this.props.size}&d=identicon`}
        className={this.props.className || ''}
      />
    );
  }
});
