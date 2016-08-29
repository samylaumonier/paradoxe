import React from 'react';
import { composeWithTracker } from 'react-komposer';
import autosize from '/node_modules/autosize/dist/autosize.min';

import { Messages } from '/imports/api/collections/messages';

import './ChatMessageFormComponentStyle.less';

const form = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    scrollToBottom: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    autosize(this.refs.content);

    this.refs.content.addEventListener('autosize:resized', () => {
      $(this.refs.messages).css('bottom', `${this.refs.content.offsetHeight + 11}px`);
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
    autosize.update(this.refs.content);

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
