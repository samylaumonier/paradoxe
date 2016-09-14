import React from 'react';
import autosize from 'autosize';

import { Messages } from '/imports/api/collections/messages';

import 'emojione-picker/css/picker.css';
import '/imports/ui/styles/parts/chat/ChatMessageFormComponentStyle.less';

export const ChatMessageFormComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    setMessagesHeight: React.PropTypes.func.isRequired,
    scrollToBottom: React.PropTypes.func.isRequired,
    toggleEmojis: React.PropTypes.func.isRequired,
    unselectEmoji: React.PropTypes.func.isRequired,
    selectedEmoji: React.PropTypes.object,
  },
  getInitialState: function () {
    return {
      message: ''
    };
  },
  componentDidMount: function () {
    const content = this.refs.content;
    autosize(content);

    content.addEventListener('autosize:resized', () => {
      this.props.setMessagesHeight(content.offsetHeight + 11);
    });

    this.props.scrollToBottom(false);
  },
  componentDidUpdate: function () {
    this.props.scrollToBottom();
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.selectedEmoji) {
      this.setState({
        message: `${this.state.message} ${nextProps.selectedEmoji.shortname}`,
      }, () => {
        this.props.unselectEmoji();
      });
    }
  },
  render: function () {
    return (
      <section>
        <div id="chat-textarea">
          <form className="ui form" onSubmit={this.postMessage}>
            <div className="field">
              <div className="ui aligned">
                <div className="ui center icon action input">
                  <button className="ui white button left-button" onClick={this.props.toggleEmojis}>
                    <i className="large smile button icon"/>
                  </button>
                  <textarea
                    placeholder={"Message " + this.props.contact.username}
                    ref="content"
                    rows="1"
                    required
                    onChange={this.updateMessage}
                    onKeyDown={this.onKeyDown}
                    value={this.state.message}
                  />
                  <button type="submit" className="ui white submit button">
                    <i className="large send button icon"/>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  },
  updateMessage: function (event) {
    this.setState({
      message: event.target.value
    });
  },
  postMessage: function (event) {
    event.preventDefault();

    const message = this.state.message.trim();
    
    console.log(message);
    
    if(!message){
      return false;
    }
    
    Messages.insert({
      toUserId: [this.props.contact._id],
      content: message,
    }, err => {
      if (err) {
        console.log("error:", err);
        toastr.error(err.reason, 'Error');
      }
    });

    this.setState({
      message: ''
    }, () => {
      autosize.update(this.refs.content);
    });

    return false;
  },
  onKeyDown: function (event) {
    if (!event.shiftKey && event.keyCode === 13) {
      this.postMessage(event);
    }
  },
});
