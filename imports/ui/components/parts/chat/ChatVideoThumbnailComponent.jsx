import React from 'react';

import '/imports/ui/styles/parts/chat/ChatVideoThumbnailComponentStyle.less';

export const ChatVideoThumbnailComponent = React.createClass({
  propTypes: {
    contactId: React.PropTypes.string.isRequired,
    videoId: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div className="ui card" onClick={this.props.onClick}>
        <a className="image" href="#">
          <img src={`https://i1.ytimg.com/vi/${this.props.videoId}/hqdefault.jpg`}/>
        </a>
        <div className="ui bottom attached button">
          <i className="play icon"/>
          Watch together
        </div>
      </div>
    );
  },
});
