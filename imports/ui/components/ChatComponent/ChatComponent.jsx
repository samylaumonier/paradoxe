import React from 'react';
import { If, Then, Else } from 'react-if';
import { composeWithTracker } from 'react-komposer';
import { browserHistory } from 'react-router';
import autosize from '/node_modules/autosize/dist/autosize.min';

import { Messages, userHasBlockedContact  } from '/imports/api/collections';
import { ChatMessageComponent } from '../ChatMessageComponent/ChatMessageComponent';

import './ChatComponentStyle.less';

const chat = React.createClass({
  propTypes: {
    userHasBlockedContact: React.PropTypes.bool.isRequired,
    contact: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired
  },
  componentDidMount: function () {
    autosize(this.refs.content);

    this.refs.content.addEventListener('autosize:resized', () => {
      $(this.refs.messages).css('bottom', `${this.refs.content.offsetHeight + 11}px`);
    });

    this.initTooltips();
    this.scrollToBottom();
  },
  componentDidUpdate: function () {
    this.initTooltips();
    this.scrollToBottom();
  },
  render: function () {
    return (
      <div id="chat">
        {/*TODO: move to ChatNavbarComponent*/}
        <div className="ui top attached menu" ref="navbar">
          <a className="ui icon item" href="#">
            <i className="file icon"/>
          </a>
          <a className="ui icon item" href="#">
            <i className="game icon"/>
          </a>
          <a className="ui icon item" href="#">
            <i className="phone icon"/>
          </a>
          <a className="ui icon item" href="#">
            <i className="record icon"/>
          </a>
          <a className="ui icon item" href="#">
            <i className="gift icon"/>
          </a>
          <If condition={this.props.userHasBlockedContact === true}>
            <Then>
              <a className="ui icon item" href="#" data-content="Unblock" onClick={this.unblockContact}>
                <i className="icons">
                  <i className="user icon"/>
                  <i className="green corner dont icon"/>
                </i>
              </a>
            </Then>
            <Else>
              <a className="ui icon item" href="#" data-content="Block" onClick={this.blockContact}>
                <i className="icons">
                  <i className="user icon"/>
                  <i className="red corner dont icon"/>
                </i>
              </a>
            </Else>
          </If>
          <a className="ui icon item" href="#" data-content="Remove" onClick={this.removeContact}>
            <i className="icons">
              <i className="user icon"/>
              <i className="red corner remove icon"/>
            </i>
          </a>
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
  initTooltips: function () {
    $(this.refs.navbar).find('[data-content]').popup({
      context: '#popups',
      inverted: true,
      position: 'bottom center'
    });
  },
  scrollToBottom: function () {
    const messages = $(this.refs.messages);

    messages.animate({
      scrollTop: messages.prop('scrollHeight')
    }, 500);
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
  removeContact: function () {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this contact?\n If you delete this contact, they will be removed from your contact list and you will no longer be able to send them messages.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('removeContact', this.props.contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          browserHistory.push('/');
          toastr.success(`${this.props.contact.username} has been deleted!`);
        }
      });
    });
  },
  blockContact: function () {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to block this contact?\n If you block this contact, you will no longer get notifications from them and they will no longer see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, block contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('blockContact', this.props.contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          toastr.success(`${this.props.contact.username} has been blocked!`);
        }
      });
    });
  },
  unblockContact: function () {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to unblock this contact?\n If you unblock this contact, you will get notifications from them and they will see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, unblock contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('unblockContact', this.props.contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          toastr.success('Contact unblocked!');
        }
      });
    });
  },
});

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      userHasBlockedContact: userHasBlockedContact(user, props.contact._id),
      contact: props.contact,
      messages: props.messages
    });
  }
}

export const ChatComponent = composeWithTracker(composer)(chat);
