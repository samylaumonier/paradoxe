import { Meteor } from 'meteor/meteor';
import React from 'react';
import nl2br from 'react-nl2br';
import { Switch, Case, Default } from 'jsx-switch';
import { composeWithTracker } from 'react-komposer';

import { INCOMING_VIDEO_CALL, OUTGOING_VIDEO_CALL } from '/imports/api/collections/messages';

import { AvatarComponent } from '/imports/ui/components/user/AvatarComponent/AvatarComponent';
import { ChatIncomingVideoCallComponent } from '/imports/ui/components/chat/ChatIncomingVideoCallComponent/ChatIncomingVideoCallComponent';
import { ChatOutgoingVideoCallComponent } from '/imports/ui/components/chat/ChatOutgoingVideoCallComponent/ChatOutgoingVideoCallComponent';

const message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired,
    onRinging: React.PropTypes.func.isRequired
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
          </div>
          <div className="text">
            <Switch>
              <Case expr={this.props.message.tag === INCOMING_VIDEO_CALL}>
                <ChatIncomingVideoCallComponent message={this.props.message} onRinging={this.props.onRinging}/>
              </Case>
              <Case expr={this.props.message.tag === OUTGOING_VIDEO_CALL}>
                <ChatOutgoingVideoCallComponent message={this.props.message}/>
              </Case>
              <Default>
                {nl2br(this.props.message.content)}
              </Default>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
});

function composer(props, onData) {
  onData(null, {
    message: props.message,
    author: Meteor.users.findOne(props.message.userId),
    onRinging: props.onRinging,
  });
}

export const ChatTaggedMessageComponent = composeWithTracker(composer)(message);
