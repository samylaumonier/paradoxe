import React from 'react';
import { If, Then, Else } from 'react-if';
import { composeWithTracker } from 'react-komposer';
import autosize from '/node_modules/autosize/dist/autosize.min';

import { Messages } from '/imports/api/collections';
import { ChatMessageComponent } from '../ChatMessageComponent/ChatMessageComponent';

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

    // TODO: auto scroll to bottom?
    //this.autorun(function () {
    //  if (template.subscriptionsReady()) {
    //    Tracker.afterFlush(function () {
    //      $('#message-zone').scrollTop($(document).height() - $(window).height());
    //    });
    //  }
    //});
  },
  render: function () {
    return (
      <div id="chat">
        {/*TODO: move to ChatNavbarComponent*/}
        <div className="ui top attached menu">
          <span className="ui icon item">
            <i className="file icon"/>
          </span>
          <span className="ui icon item">
            <i className="game icon"/>
          </span>
          <span className="ui icon item">
            <i className="phone icon"/>
          </span>
          <span className="ui icon item">
            <i className="record icon"/>
          </span>
          <span className="ui icon item">
            <i className="gift icon"/>
          </span>
          <span className="ui icon item">
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner dont icon"/>
          </i>
          </span>
          <span className="ui icon item">
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner remove icon"/>
          </i>
          </span>
        </div>
        
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
                    <textarea ref="content" rows="1"/>
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
  // TODO: allow to send message by pressing "enter"?
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
    return false;
  }
});

function composer(props, onData) {
  onData(null, {
    props
  });
}

export const ChatComponent = composeWithTracker(composer)(chat);
