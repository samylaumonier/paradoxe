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
import { ChatIncomingVideoCallComponent } from '/imports/ui/components/parts/chat/ChatIncomingVideoCallComponent/ChatIncomingVideoCallComponent';
import { ChatOutgoingVideoCallComponent } from '/imports/ui/components/parts/chat/ChatOutgoingVideoCallComponent/ChatOutgoingVideoCallComponent';
import { ChatHungUpVideoCallComponent } from '/imports/ui/components/parts/chat/ChatHungUpVideoCallComponent/ChatHungUpVideoCallComponent';
import { ChatShareFileComponent } from '/imports/ui/components/parts/chat/ChatShareFileComponent/ChatShareFileComponent';

export const ChatTaggedMessageComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired,
    onAnswer: React.PropTypes.func.isRequired,
    onDecline: React.PropTypes.func.isRequired,
    onHangUp: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onMissed: React.PropTypes.func.isRequired,
    onStartUploadFile: React.PropTypes.func.isRequired,
    getFiles: React.PropTypes.func.isRequired,
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
                <ChatIncomingVideoCallComponent
                  contact={this.props.contact}
                  message={this.props.message}
                  onAnswer={this.props.onAnswer}
                />
              </Case>
              <Case expr={this.props.message.tag === OUTGOING_VIDEO_CALL_TAG}>
                <ChatOutgoingVideoCallComponent
                  contact={this.props.contact}
                  message={this.props.message}
                  onDecline={this.props.onDecline}
                  onCancel={this.props.onCancel}
                  onMissed={this.props.onMissed}
                />
              </Case>
              <Case expr={this.props.message.tag === HUNG_UP_VIDEO_CALL_TAG}>
                <ChatHungUpVideoCallComponent
                  contact={this.props.contact}
                  message={this.props.message}
                  onHangUp={this.props.onHangUp}
                />
              </Case>
              <Case expr={this.props.message.tag === FILE_UPLOAD_TAG}>
                <ChatShareFileComponent
                  contact={this.props.contact}
                  message={this.props.message}
                  onStartUploadFile={this.props.onStartUploadFile}
                  getFiles={this.props.getFiles}
                />
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
