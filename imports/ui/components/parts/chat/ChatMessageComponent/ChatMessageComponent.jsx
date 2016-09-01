import React from 'react';
import nl2br from 'react-nl2br';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

export const ChatMessageComponent = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className="comment">
        <a className="avatar">
          <AvatarComponent user={this.props.author} size={35}/>
        </a>
        <div className="content">
          <a className="author">{this.props.author.username}</a>
          <div className="metadata">
            <div className="date">
              {moment(this.props.message.createdAt).fromNow()}
            </div>
            <div className="actions">
              <a className="reply">More</a>
            </div>
          </div>
          <div className="text">
            {nl2br(this.props.message.content)}
          </div>
        </div>
      </div>
    );
  }
});
