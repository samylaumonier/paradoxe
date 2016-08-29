import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import React from 'react';
import { If, Then, Else } from 'react-if';

import { Messages } from '/imports/api/collections/messages';
import { userHasContact } from '/imports/api/collections/users';
import { VideoPeer } from '/imports/api/VideoPeer';

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
    this.setState({
      videoPeer: null,
      onVideoCall: false,
      ringing: false,
      callerVideoPeerId: null,
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
                startVideoCall={this.startVideoCall}
                onRinging={this.onRinging}
              />
              <ChatSidebarComponent
                user={this.props.user}
                contact={this.props.contact}
                onVideoCall={this.state.onVideoCall}
                startUserVideo={this.startUserVideo}
                ringing={this.state.ringing}
                startPartnerVideo={this.startPartnerVideo}
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
  startVideoCall: function (callback) {
    const videoPeer = new VideoPeer();

    videoPeer.run(id => {
      callback(id);
    });

    this.setState({
      videoPeer,
      onVideoCall: true,
    });
  },
  startUserVideo: function () {
    this.state.videoPeer.getUserVideo();
  },
  onRinging: function (callerVideoPeerId) {
    const videoPeer = new VideoPeer();

    videoPeer.run();
    videoPeer.getUserVideo(false, false, false, err => {
      if (err) {
        toastr.error(err, 'Error');
      } else {
        this.setState({
          videoPeer,
          ringing: true,
          callerVideoPeerId
        });
      }
    });
  },
  startPartnerVideo: function () {
    this.state.videoPeer.callAKey(this.state.callerVideoPeerId);
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
          { userId: Meteor.settings.public.bot.id, toUserId: user._id },
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
