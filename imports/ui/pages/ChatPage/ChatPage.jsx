import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import React from 'react';
import { If, Then, Else } from 'react-if';

import { Messages, ANSWERED_STATUS, CANCELED_STATUS, HUNG_UP_STATUS } from '/imports/api/collections/messages';
import { userHasContact } from '/imports/api/collections/users';

import { ChatComponent } from '/imports/ui/components/chat/ChatComponent/ChatComponent';
import { ChatSidebarComponent } from '/imports/ui/components/chat/ChatSidebarComponent/ChatSidebarComponent';

const chatPage = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    hasContact: React.PropTypes.bool.isRequired,
    contact: React.PropTypes.object,
    messages: React.PropTypes.array.isRequired
  },
  componentWillMount: function () {
    this.setDefaultState();
  },
  setDefaultState: function () {
    this.setState({
      peer: null,
      stream: null,
      call: null,
      userPeerId: null,
      contactPeerId: null,
      callMessageId: null,
    });
  },
  render: function () {
    return (
      <div>
        <If condition={this.props.hasContact}>
          <Then>
            <div>
              <ChatComponent
                messages={this.props.messages}
                contact={this.props.contact}
                currentCall={this.state.call !== null}
                startVideoCall={this.startVideoCall}
                stopVideoCall={this.stopVideoCall}
                onAnswer={this.onAnswer}
                onDecline={this.onDecline}
                onCancel={this.onCancel}
              />
              <ChatSidebarComponent
                user={this.props.user}
                contact={this.props.contact}
                stream={this.state.stream}
                call={this.state.call}
              />
            </div>
          </Then>
          <Else>
            <p>404</p>
          </Else>
        </If>
      </div>
    );
  },
  startVideoCall: function () {
    if (!this.props.contact.status.online) {
      toastr.error(`${this.props.contact.username} is offline.`, 'Error');
      return false;
    }

    this.getUserStream((err, stream) => {
      if (err) {
        toastr.error('Webcam must be allowed to make a video call.', 'Error');
      } else {
        this.setState({
          stream
        });

        this.initPeer(userPeerId => {
          if (userPeerId) {
            const callMessageId = Meteor.call('startVideoCall', userPeerId, this.props.contact._id, err => {
              if (err) {
                toastr.error(err.reason, 'Error');
              }
            });

            this.setState({
              callMessageId
            });
          } else {
            toastr.error('Unable to connect to the server.', 'Error');
          }
        });
      }
    });
  },
  getUserStream: function (onStream) {
    navigator.getUserMedia({ audio: true, video: true }, stream => {
      onStream(null, stream);
    }, err => {
      onStream(err);
    });
  },
  initPeer: function (onOpen) {
    const peer = new Peer({
      host: Meteor.settings.public.peer.host,
      port: Meteor.settings.public.peer.port,
      path: Meteor.settings.public.peer.path
    });

    peer.on('open', userPeerId => {
      console.log('on open', userPeerId);

      this.setState({
        userPeerId
      });

      onOpen(userPeerId);
    });

    peer.on('call', call => {
      console.log('on call', call);
      call.answer(this.state.stream);

      this.setState({
        call
      });
    });

    peer.on('error', err => {
      console.log('peer error', err);
    });

    peer.on('close', err => {
      console.log('peer close', err);
    });

    peer.on('disconnected', () => {
      console.log('peer disconnected');
    });

    this.setState({
      peer
    });
  },
  onAnswer: function (message) {
    this.getUserStream((err, stream) => {
      if (err) {
        toastr.error('Webcam must be allowed to make a video call.', 'Error');
      } else {
        this.setState({
          stream
        });

        this.initPeer(userPeerId => {
          if (userPeerId) {
            Meteor.call('updateVideoCallStatus', message._id, ANSWERED_STATUS);

            this.setState({
              contactPeerId: message.callerVideoPeerId,
              call: this.state.peer.call(message.callerVideoPeerId, stream),
              callMessageId: message._id,
            });
          } else {
            toastr.error('Unable to connect to the server.', 'Error');
          }
        });
      }
    });
  },
  stopPeer: function () {
    if (this.state.peer) {
      if (this.state.call) {
        this.state.call.close();
      }

      if (this.state.stream) {
        this.state.stream.stop();
      }

      this.state.peer.destroy();
      this.setDefaultState();
    }
  },
  onDecline: function (message) {
    this.stopPeer();
    Meteor.call('setVideoCallDeclined', message._id);
  },
  onCancel: function (message) {
    this.stopPeer();
    Meteor.call('updateVideoCallStatus', message._id, CANCELED_STATUS);
  },
  stopVideoCall: function () {
    this.stopPeer();
    Meteor.call('setVideoCallHunUp', this.state.callMessageId);
  },
});

function composer(props, onData) {
  const subscription = Meteor.subscribe('chat.messages', props.params.contactUsername);

  if (subscription.ready()) {
    const user = Meteor.user();
    const contact = Meteor.users.findOne({
      username: props.params.contactUsername
    });

    let hasContact = false;
    let messages = [];

    if (user && contact && userHasContact(user, contact._id)) {
      hasContact = true;

      messages = Messages.find({
        $or: [
          { userId: user._id, toUserId: contact._id },
          { userId: contact._id, toUserId: user._id },
          { userId: Meteor.settings.public.bot.id, toUserId: { $in: [user._id] } },
        ]
      }, {
        sort: {
          sentAt: -1
        }
      }).fetch();
    }

    onData(null, {
      user,
      hasContact,
      contact,
      messages
    });
  }
}

export const ChatPage = composeWithTracker(composer)(chatPage);
