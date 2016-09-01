import React from 'react';
import ReactEmoji from 'react-emoji';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

const newlineRegex = /(\r\n|\n\r|\r|\n)/g;
const options = {
  emojiType: 'emojione'
};

export const ChatMessageComponent = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired
  },
  mixins: [
    ReactEmoji
  ],
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
            {this.props.message.content.split(newlineRegex).map((line, index) => {
              if (line.match(newlineRegex)) {
                return <br key={index}/>;
              } else {
                return this.emojify(line, options);
              }
            })}
          </div>
        </div>
      </div>
    );
  }
});
