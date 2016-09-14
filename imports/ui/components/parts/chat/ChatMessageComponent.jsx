import React from 'react';
import emojione from 'emojione';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

import '/imports/ui/styles/parts/chat/ChatMessageComponentStyle.less';

const newlineRegex = /(\r\n|\n\r|\r|\n)/g;
emojione.ascii = true;

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
          <div className="text" ref="text">
            {this.props.message.content.split(newlineRegex).map((line, index) => {
              if (line.match(newlineRegex)) {
                return <br key={index}/>;
              } else {
                return <span key={index} dangerouslySetInnerHTML={{__html: emojione.toImage(line.trim())}} />;
              }
            })}
          </div>
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    $(this.refs.text).find('span').each(function () {
      const line = $(this);

      if (line.contents().length === 1) {
        line.addClass('big-emojis');
      }
    });
  },
});
