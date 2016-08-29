import React from 'react';
import { If, Then, Else } from 'react-if';
import { composeWithTracker } from 'react-komposer';

import { ChatNavbarComponent } from '/imports/ui/components/chat/ChatNavbarComponent/ChatNavbarComponent';
import { ChatMessageComponent } from '/imports/ui/components/chat/ChatMessageComponent/ChatMessageComponent';
import { ChatMessageFormComponent } from '/imports/ui/components/chat/ChatMessageFormComponent/ChatMessageFormComponent';

import './ChatComponentStyle.less';

const chat = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired
  },
  render: function () {
    return (
      <div id="chat">
        <ChatNavbarComponent contact={this.props.contact}/>

        <div id="message-zone" ref="messages">
          <If condition={this.props.messages.length !== 0}>
            <Then>
              <div className="ui comments">
                {this.props.messages.map(message => <ChatMessageComponent key={message._id} message={message} />)}
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
  },
});

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      contact: props.contact,
      messages: props.messages
    });
  }
}

export const ChatComponent = composeWithTracker(composer)(chat);
