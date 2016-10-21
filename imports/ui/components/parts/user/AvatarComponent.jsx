import React from 'react';

import { Files } from '/imports/api/collections/files';

export const AvatarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    size: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
  },
  render: function () {
    return this.getImage();
  },
  getDefaultUrl: function () {
    return `https://secure.gravatar.com/avatar/?s=${this.props.size}&d=mm`;
  },
  getUrl: function () {
    if (this.props.user.profile && this.props.user.profile.pictureId) {
      const file = Files.findOne(this.props.user.profile.pictureId);

      if (file && file.name) {
        return file.link();
      }
    }

    return this.props.user.profile && this.props.user.profile.emailHash
      ? `https://secure.gravatar.com/avatar/${this.props.user.profile.emailHash}?s=${this.props.size}&d=identicon`
      : this.getDefaultUrl();
  },
  getImage: function () {
    const style = {
      maxWidth: `${this.props.size}px`,
      maxHeight: `${this.props.size}px`,
      backgroundImage: `url('${this.getUrl()}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    return <div className={this.props.className || ''} style={style}/>;
  },
});
