import React from 'react';
import { If, Then, Else } from 'react-if';
import { composeWithTracker } from 'react-komposer';

import { ChatNavbarComponent } from '/imports/ui/components/chat/ChatNavbarComponent/ChatNavbarComponent';
import { ChatTaggedMessageComponent } from '/imports/ui/components/chat/ChatTaggedMessageComponent/ChatTaggedMessageComponent';
import { ChatMessageComponent } from '/imports/ui/components/chat/ChatMessageComponent/ChatMessageComponent';
import { ChatMessageFormComponent } from '/imports/ui/components/chat/ChatMessageFormComponent/ChatMessageFormComponent';

import './ChatComponentStyle.less';

const chat = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired,
    startVideoCall: React.PropTypes.func.isRequired,
    onRinging: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div id="chat">
        <ChatNavbarComponent contact={this.props.contact} startVideoCall={this.props.startVideoCall}/>

        <div id="message-zone" ref="messages">
          <If condition={this.props.messages.length !== 0}>
            <Then>
              <div className="ui comments">
                {this.props.messages.map(message => message.tag
                  ? <ChatTaggedMessageComponent key={message._id} message={message} onRinging={this.props.onRinging}/>
                  : <ChatMessageComponent key={message._id} message={message} />
                )}
              </div>
            </Then>
            <Else>
              <p>No messages yet!</p>
            </Else>
          </If>
        </div>

        <ChatMessageFormComponent contact={this.props.contact} scrollToBottom={this.scrollToBottom}/>
      </div>
    );
  },
  scrollToBottom: function () {
    const messages = $(this.refs.messages);

    messages.animate({
      scrollTop: messages.prop('scrollHeight')
    }, 500);
  }
});

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      contact: props.contact,
      messages: props.messages,
      startVideoCall: props.startVideoCall,
      onRinging: props.onRinging,
    });
  }
}

export const ChatComponent = composeWithTracker(composer)(chat);
