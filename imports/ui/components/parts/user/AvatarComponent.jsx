import React from 'react';

export const AvatarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    size: React.PropTypes.number.isRequired,
    className: React.PropTypes.string
  },
  render: function () {
    const src = this.props.user.profile && this.props.user.profile.emailHash
      ? `https://secure.gravatar.com/avatar/${this.props.user.profile.emailHash}?s=${this.props.size}&d=identicon`
      : `https://secure.gravatar.com/avatar/?s=${this.props.size}&d=mm`;

    return (
      <img
        src={src}
        className={this.props.className || ''}
      />
    );
  }
});
