import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { connect } from 'react-redux';

import { saveCallState } from '/imports/actions/chats/save';
import { deleteCallState } from '/imports/actions/chats/delete';

import { Messages } from '/imports/api/collections/messages';
import { userHasContact } from '/imports/api/collections/users';
import { Files } from '/imports/api/collections/files';

import { ChatPageComponent } from '/imports/ui/components/pages/ChatPageComponent/ChatPageComponent';

/** @namespace props.params.contactUsername */
function composer(props, onData) {
  const subscription = Meteor.subscribe('chat.messages', props.params.contactUsername);

  if (subscription.ready()) {
    const user = Meteor.user();
    const contact = Meteor.users.findOne({
      username: props.params.contactUsername
    });

    let hasContact = false;
    let messages = [];
    let files = [];

    if (user && contact && userHasContact(user, contact._id)) {
      hasContact = true;

      messages = Messages.find({
        $or: [
          { userId: user._id, toUserId: { $in: [contact._id] } },
          { userId: contact._id, toUserId: { $in: [user._id] } },
          { userId: Meteor.settings.public.bot.id, toUserId: { $in: [user._id] }, contactId: { $in: [contact._id] } },
        ]
      }, {
        sort: {
          sentAt: -1
        }
      }).fetch();

      files = Files.find({
        $or: [
          { userId: user._id, 'meta.contactId': { $in: [contact._id] }},
          { userId: contact._id, 'meta.contactId': { $in: [user._id] }},
        ]
      }).fetch();
    }

    onData(null, {
      user,
      hasContact,
      contact,
      messages,
      files
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    callState: state.chats[ownProps.params.contactUsername],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onStartVideoCall: (contactUsername, callState) => {
      dispatch(saveCallState(contactUsername, callState));
    },
    onStopVideoCall: contactUsername => {
      dispatch(deleteCallState(contactUsername));
    },
  };
};

export const ChatPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(composeWithTracker(composer)(ChatPageComponent));
