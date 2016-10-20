import React from 'react';
import emojione from 'emojione';

import { Electron } from 'meteor/risetechnologies:electron-builder-local';

import { shouldMarkMessageAsRead } from '/imports/api/collections/messages';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';
import { ChatVideoThumbnailContainer } from '/imports/ui/containers/parts/chat/ChatVideoThumbnailContainer';

import '/imports/ui/styles/parts/chat/ChatMessageComponentStyle.less';

const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
const newlineRegex = /(\r\n|\n\r|\r|\n)/g;

emojione.ascii = true;

export const ChatMessageComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired,
    hasVideos: React.PropTypes.bool.isRequired,
    readMessage: React.PropTypes.func.isRequired,
    deleteMessage: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    $('.url').click((e) => {
      if (Electron.isElectron()) {
        e.preventDefault();
        Electron.openExternal($(e.target).attr("href"));
      }
    });

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
    const actions = this.props.message.userId === this.props.user._id ?
      <div className="actions">
        <a className="reply" onClick={this.props.deleteMessage}>
          <i className="trash outline icon"/> Delete
        </a>
      </div> : null;

    const message = this.props.message.content
      .split(newlineRegex)
      .map((line, index) => line.match(newlineRegex)
        ? <br key={index}/>
        : <span key={index} dangerouslySetInnerHTML={{__html: getMessageLine(line)}}/>
      );

    const videos = this.props.hasVideos ?
      <div className="videos ui cards">{this.props.message.videos.map(videoId =>
        <ChatVideoThumbnailContainer
          key={videoId}
          contactId={this.props.contact._id}
          videoId={videoId}
        />
      )}</div> : null;

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
            {actions}
          </div>
          <div className="text" ref="text">
            {message}
          </div>
          {videos}
        </div>
      </div>
    );
  },
});

function getMessageLine(line) {
  return emojione.toImage(linkify(line.trim()));
}

function linkify(text) {
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener" class="url">${url}</a>`);
}
