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
    currentCall: React.PropTypes.bool.isRequired,
    startVideoCall: React.PropTypes.func.isRequired,
    stopVideoCall: React.PropTypes.func.isRequired,
    onAnswer: React.PropTypes.func.isRequired,
    onDecline: React.PropTypes.func.isRequired,
    onHangUp: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div id="chat">
        <ChatNavbarComponent
          contact={this.props.contact}
          currentCall={this.props.currentCall}
          startVideoCall={this.props.startVideoCall}
          stopVideoCall={this.props.stopVideoCall}
        />

        <div id="message-zone" ref="messages">
          <If condition={this.props.messages.length !== 0}>
            <Then>
              <div className="ui comments">
                {this.props.messages.map(message => message.tag
                  ? <ChatTaggedMessageComponent
                    key={message._id}
                    contact={this.props.contact}
                    message={message}
                    onAnswer={this.props.onAnswer}
                    onDecline={this.props.onDecline}
                    onHangUp={this.props.onHangUp}
                    onCancel={this.props.onCancel}
                  />
                  : <ChatMessageComponent
                    key={message._id}
                    message={message}
                  />
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
      props
    });
  }
}

export const ChatComponent = composeWithTracker(composer)(chat);
