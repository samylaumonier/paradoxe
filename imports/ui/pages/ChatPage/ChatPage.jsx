import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import React from 'react';
import { If, Then, Else } from 'react-if';
import { ChatComponent } from '/imports/ui/components/ChatComponent/ChatComponent';
import { ChatSidebarComponent } from '/imports/ui/components/ChatSidebarComponent/ChatSidebarComponent';
import { Messages, userHasContact } from '/imports/api/collections';

const chatPage = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    hasContact: React.PropTypes.bool.isRequired,
    contact: React.PropTypes.object,
    messages: React.PropTypes.array.isRequired
  },
  render: function () {
    return (
      <div>
        <If condition={this.props.hasContact}>
          <Then>
            <div>
              <ChatComponent messages={this.props.messages} contact={this.props.contact}/>
              <ChatSidebarComponent user={this.props.user} contact={this.props.contact}/>
            </div>
          </Then>
          <Else>
            <p>404</p>
          </Else>
        </If>
      </div>
    );
  }
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
