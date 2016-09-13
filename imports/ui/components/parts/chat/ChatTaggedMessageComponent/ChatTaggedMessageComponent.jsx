import React from 'react';
import nl2br from 'react-nl2br';
import { Switch, Case, Default } from 'jsx-switch';

import {
  INCOMING_VIDEO_CALL_TAG,
  OUTGOING_VIDEO_CALL_TAG,
  HUNG_UP_VIDEO_CALL_TAG,
  FILE_UPLOAD_TAG
} from '/imports/api/collections/messages';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';
import { ChatIncomingVideoCallContainer } from '/imports/ui/containers/parts/chat/ChatIncomingVideoCallContainer';
import { ChatOutgoingVideoCallContainer } from '/imports/ui/containers/parts/chat/ChatOutgoingVideoCallContainer';
import { ChatHungUpVideoCallContainer } from '/imports/ui/containers/parts/chat/ChatHungUpVideoCallContainer';
import { ChatShareFileComponent } from '/imports/ui/components/parts/chat/ChatShareFileComponent/ChatShareFileComponent';

export const ChatTaggedMessageComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired,
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
                {/*<ChatShareFileComponent contact={this.props.contact} message={this.props.message}/>*/}
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
