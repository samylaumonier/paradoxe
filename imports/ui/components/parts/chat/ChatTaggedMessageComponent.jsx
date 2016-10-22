import React from 'react';
import nl2br from 'react-nl2br';
import { Switch, Case, Default } from 'jsx-switch';

import {
  INCOMING_VIDEO_CALL_TAG,
  OUTGOING_VIDEO_CALL_TAG,
  HUNG_UP_VIDEO_CALL_TAG,
  FILE_UPLOAD_TAG,
  NUDGE_TAG,
  shouldMarkMessageAsRead
} from '/imports/api/collections/messages';

import { ChatIncomingVideoCallContainer } from '/imports/ui/containers/parts/chat/ChatIncomingVideoCallContainer';
import { ChatOutgoingVideoCallContainer } from '/imports/ui/containers/parts/chat/ChatOutgoingVideoCallContainer';
import { ChatHungUpVideoCallContainer } from '/imports/ui/containers/parts/chat/ChatHungUpVideoCallContainer';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';
import { ChatShareFilesComponent } from '/imports/ui/components/parts/chat/ChatShareFilesComponent';
import { ChatNudgeComponent } from '/imports/ui/components/parts/chat/ChatNudgeComponent';

export const ChatTaggedMessageComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired,
    readMessage: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    if (shouldMarkMessageAsRead(this.props.message)) {
      this.props.readMessage();
    }
  },
  render: function () {
    return (
      <div className="comment" data-id={this.props.message._id}>
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
              <Case expr={this.props.message.tag === INCOMING_VIDEO_CALL_TAG}>
                <ChatIncomingVideoCallContainer contact={this.props.contact} message={this.props.message}/>
              </Case>
              <Case expr={this.props.message.tag === OUTGOING_VIDEO_CALL_TAG}>
                <ChatOutgoingVideoCallContainer contact={this.props.contact} message={this.props.message}/>
              </Case>
              <Case expr={this.props.message.tag === HUNG_UP_VIDEO_CALL_TAG}>
                <ChatHungUpVideoCallContainer contact={this.props.contact} message={this.props.message}/>
              </Case>
              <Case expr={this.props.message.tag === FILE_UPLOAD_TAG}>
                <ChatShareFilesComponent contact={this.props.contact} message={this.props.message}/>
              </Case>
              <Case expr={this.props.message.tag === NUDGE_TAG}>
                <ChatNudgeComponent contact={this.props.contact} message={this.props.message}/>
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
