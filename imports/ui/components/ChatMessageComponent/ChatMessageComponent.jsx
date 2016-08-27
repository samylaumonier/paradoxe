import { Meteor } from 'meteor/meteor';
import React from 'react';
import nl2br from 'react-nl2br';
import { composeWithTracker } from 'react-komposer';

import { AvatarComponent } from '../AvatarComponent/AvatarComponent';

const message = React.createClass({
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

function composer(props, onData) {
  onData(null, {
    message: props.message,
    author: Meteor.users.findOne(props.message.userId)
  });
}

export const ChatMessageComponent = composeWithTracker(composer)(message);
