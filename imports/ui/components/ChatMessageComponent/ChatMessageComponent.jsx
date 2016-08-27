import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';

const message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className="comment">
        <a className="avatar">
          <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
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
            {this.props.message.content}
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
