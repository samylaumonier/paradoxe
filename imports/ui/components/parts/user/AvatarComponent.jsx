import React from 'react';

import { Files } from '/imports/api/collections/files';

export const AvatarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    group: React.PropTypes.object,
    size: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
  },
  shouldComponentUpdate: function (nextProps) {
    if (this.getFile() && !this.getFile(nextProps)) {
      return false;
    }

    if (nextProps.user && _.has(nextProps.user, 'ready')) {
      return nextProps.user.ready;
    }

    return true;
  },
  render: function () {
    return this.getImage();
  },
  getDefaultUrl: function () {
    return `https://secure.gravatar.com/avatar/?s=${this.props.size}&d=mm`;
  },
  getFile: function (props = this.props) {
    let file = null;

    if (props.user && props.user.profile && props.user.profile.pictureId) {
      file = Files.findOne(props.user.profile.pictureId);
    } else if (props.group && props.group.pictureId) {
      file = Files.findOne(props.group.pictureId);
    }

    return file;
  },
  getUrl: function () {
    const file = this.getFile();

    if (file) {
      return file.link();
    }

    if (this.props.user && this.props.user.profile && this.props.user.profile.emailHash) {
      return `https://secure.gravatar.com/avatar/${this.props.user.profile.emailHash}?s=${this.props.size}&d=identicon`;
    }

    return this.getDefaultUrl();
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
