import React from 'react';
import { composeWithTracker } from 'react-komposer';
import autosize from '/node_modules/autosize/dist/autosize.min';

import { Messages } from '/imports/api/collections/messages';

import './ChatMessageFormComponentStyle.less';

const form = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    setMessagesHeight: React.PropTypes.func.isRequired,
    scrollToBottom: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      message: ''
    };
  },
  componentDidMount: function () {
    autosize(this.refs.content);

    this.refs.content.addEventListener('autosize:resized', () => {
      this.props.setMessagesHeight(this.refs.content.offsetHeight + 11);
    });

    this.props.scrollToBottom();
  },
  componentDidUpdate: function () {
    this.props.scrollToBottom();
  },
  render: function () {
    return (
      <section>
        <div id="chat-textarea">
          <form className="ui form" onSubmit={this.postMessage}>
            <div className="field">
              <div className="ui aligned">
                <div className="ui center icon action input">
                  <button className="ui white submit button left-button">
                    <i className="large smile button icon"/>
                  </button>
                  <textarea
                    ref="content"
                    rows="1"
                    required
                    onChange={this.updateMessage}
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
  // TODO: allow to send message by pressing "enter"?
  postMessage: function (event) {
    event.preventDefault();

    Messages.insert({
      toUserId: this.props.contact._id,
      content: this.state.message,
    }, err => {
      if (err) {
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
});

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      contact: props.contact,
      scrollToBottom: props.scrollToBottom,
    });
  }
}

export const ChatMessageFormComponent = composeWithTracker(composer)(form);
