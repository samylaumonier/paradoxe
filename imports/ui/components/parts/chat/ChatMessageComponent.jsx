import React from 'react';
import emojione from 'emojione';
// import youtubeRegex from 'youtube-regex';
// import YouTube from 'react-youtube';

import { shouldMarkMessageAsRead } from '/imports/api/collections/messages';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

import '/imports/ui/styles/parts/chat/ChatMessageComponentStyle.less';

const newlineRegex = /(\r\n|\n\r|\r|\n)/g;
emojione.ascii = true;

export const ChatMessageComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired,
    readMessage: React.PropTypes.func.isRequired,
    deleteMessage: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    $(this.refs.text).find('span').each(function () {
      const line = $(this);

      if (line.contents().length === 1) {
        line.addClass('big-emojis');
      }
    });

    if (shouldMarkMessageAsRead(this.props.message)) {
      this.props.readMessage();
    }
  },
  render: function () {
    const canDelete = this.props.message.userId === this.props.user._id ?
      <div className="actions">
        <a className="reply" onClick={this.props.deleteMessage}>
          <i className="trash outline icon"/> Delete
        </a>
      </div>
      : <span/>;

    const message = this.props.message.content.split(newlineRegex).map((line, index) => {
      if (line.match(newlineRegex)) {
        return <br key={index}/>;
      } else {
        /*const html = line.trim().replace(youtubeRegex(), (match, videoId) => {
          return <YouTube videoId={videoId}/>;
        });*/

        return <span key={index} dangerouslySetInnerHTML={{__html: emojione.toImage(line.trim())}} />;
      }
    });
    
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
            {canDelete}
          </div>
          <div className="text" ref="text">
            {message}
          </div>
        </div>
      </div>
    );
  },
});
