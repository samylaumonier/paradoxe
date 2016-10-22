import React from 'react';
import EmojiPicker from 'emojione-picker';
import ScrollListener from 'react-scroll-listener';

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
    ready: React.PropTypes.bool.isRequired,
    increaseChatLimit: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      selectedEmoji: null,
      lastDisplayedMessage: null,
    };
  },
  componentDidMount: function () {
    const scrollListener = new ScrollListener({
      host: this.refs.messages,
    });

    scrollListener.addScrollEndHandler('messages', this.onScrollEnd);
  },
  componentDidUpdate: function (prevProps) {
    if (this.state.lastDisplayedMessage && prevProps.messages.length !== this.props.messages.length) {
      this.scrollToMessage(this.state.lastDisplayedMessage);
      this.setState({
        lastDisplayedMessage: null,
      });
    } else if (_.last(prevProps.messages)._id !== _.last(this.props.messages)._id) {
      this.scrollToBottom();
    }
  },
  render: function () {
    const spinner = !this.props.ready ?
      <div className="ui active centered inline loader"/> : null;

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
            {spinner}
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
  onScrollEnd: function (event) {
    if (event.target.scrollTop === 0) {
      this.setState({
        lastDisplayedMessage: this.props.messages[0],
      }, () => {
        this.props.increaseChatLimit();
      });
    }
  },
  scrollToMessage: function (message) {
    const messages = $(this.refs.messages);
    const element = messages.find(`[data-id="${message._id}"]`);

    if (element) {
      const offset = messages.scrollTop() - messages.offset().top + element.offset().top - element.outerHeight() - 30;
      messages.scrollTop(offset < 0 ? 0 : offset);
    }
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
