import React from 'react';
import { If, Then, Else } from 'react-if';
import { composeWithTracker } from 'react-komposer';
import autosize from '/node_modules/autosize/dist/autosize.min';

import { Messages } from '/imports/api/collections';
import { ChatMessageComponent } from '../ChatMessageComponent/ChatMessageComponent';
import { ChatNavbarComponent } from '../ChatNavbarComponent/ChatNavbarComponent';

import './ChatComponentStyle.less';

const chat = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired
  },
  componentDidMount: function () {
    autosize(this.refs.content);

    this.refs.content.addEventListener('autosize:resized', () => {
      $(this.refs.messages).css('bottom', `${this.refs.content.offsetHeight + 11}px`);
    });

    this.scrollToBottom();
  },
  componentDidUpdate: function () {
    this.scrollToBottom();
  },
  render: function () {
    return (
      <div id="chat">
        {/*TODO: move to ChatNavbarComponent*/}
        <ChatNavbarComponent />
        
        
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

        {/*TODO: move to ChatMessageFormComponent*/}
        <section id="chat-textarea-section">
          <div id="chat-textarea">
            <form className="ui form" onSubmit={this.postMessage}>
              <div className="field">
                <div className="ui aligned">
                  <div className="ui center icon action input">
                    <button className="ui white submit button left-button">
                      <i className="large smile button icon"/>
                    </button>
                    <textarea ref="content" rows="1" required/>
                    <button type="submit" className="ui white submit button">
                      <i className="large send button icon"/>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        
      </div>
    );
  },
  scrollToBottom: function () {
    const messages = $(this.refs.messages);

    messages.animate({
      scrollTop: messages.prop('scrollHeight')
    }, 500);
  },
  
  // TODO: send message by pressing "enter"?
  
  postMessage: function (event) {
    event.preventDefault();

    const textarea = $(this.refs.content);
    const content = textarea.val();

    Messages.insert({
      toUserId: this.props.contact._id,
      content
    }, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    textarea.val('');
    autosize.update(this.refs.content);

    return false;
  }
});

function composer(props, onData) {
  onData(null, {
    props
  });
}

export const ChatComponent = composeWithTracker(composer)(chat);
