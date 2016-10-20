import React from 'react';
import EmojiPicker from 'emojione-picker';

import { ChatNavbarContainer } from '/imports/ui/containers/parts/chat/ChatNavbarContainer';
import { ChatMessageContainer } from '/imports/ui/containers/parts/chat/ChatMessageContainer';
import { ChatTaggedMessageContainer } from '/imports/ui/containers/parts/chat/ChatTaggedMessageContainer';
import { ChatReceiverContainer } from '/imports/ui/containers/parts/chat/ChatReceiverContainer';
import { ChatMessageFormComponent } from '/imports/ui/components/parts/chat/ChatMessageFormComponent';

import '/imports/ui/styles/parts/chat/ChatComponentStyle.less';

export const ChatComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired,
  },
  getInitialState: function () {
    return {
      selectedEmoji: null,
    };
  },
  render: function () {
    const messages = this.props.messages.length ?
      <div className="ui comments">
        {this.props.messages.map(message => message.tag
          ? <ChatTaggedMessageContainer key={message._id} contact={this.props.contact} message={message}/>
          : <ChatMessageContainer key={message._id} contact={this.props.contact} message={message}/>
        )}
      </div> : <p>No messages yet!</p>;

    return (
      <ChatReceiverContainer contact={this.props.contact}>
        <div id="chat">
          <ChatNavbarContainer contact={this.props.contact}/>
          <div id="message-zone" ref="messages">
            {messages}
          </div>
          <div id="emojis-container" ref="emojis">
            <EmojiPicker search={true} onChange={this.onSelectEmoji}/>
          </div>
          <ChatMessageFormComponent
            user={this.props.user}
            contact={this.props.contact}
            setMessagesHeight={this.setMessagesHeight}
            scrollToBottom={this.scrollToBottom}
            toggleEmojis={this.toggleEmojis}
            unselectEmoji={this.unselectEmoji}
            selectedEmoji={this.state.selectedEmoji}
          />
        </div>
      </ChatReceiverContainer>
    );
  },
  setMessagesHeight: function (height) {
    $(this.refs.messages).css('bottom', `${height}px`);
    $(this.refs.emojis).css('bottom', `${height}px`);
  },
  scrollToBottom: function (smooth = true) {
    const messages = $(this.refs.messages);

    messages.stop().animate({
      scrollTop: messages.prop('scrollHeight'),
    }, smooth ? 500 : 0);
  },
  toggleEmojis: function (event = null) {
    if (event) {
      event.preventDefault();
    }

    $(this.refs.emojis).toggle();
  },
  unselectEmoji: function () {
    this.setState({
      selectedEmoji: null
    });
  },
  onSelectEmoji: function (emoji) {
    this.setState({
      selectedEmoji: emoji
    });
  },
});
