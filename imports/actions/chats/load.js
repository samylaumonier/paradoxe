import { Meteor } from 'meteor/meteor';

import { defaultChatState } from '/imports/reducers/chats';
import { userHasContact } from '/imports/api/collections/users';
import { Messages } from '/imports/api/collections/messages';
import { Files } from '/imports/api/collections/files';

export const CHAT_SUBSCRIPTION = 'CHAT_SUBSCRIPTION';
export const CHAT_SUBSCRIPTION_READY = 'CHAT_SUBSCRIPTION_READY';
export const CHAT_SUBSCRIPTION_CHANGED = 'CHAT_SUBSCRIPTION_CHANGED';

export function loadChat(contactUsername) {
  return dispatch => {
    dispatch({
      type: CHAT_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('chat.messages', contactUsername),
        get: () => {
          const user = Meteor.user();
          const chatState = {
            ...defaultChatState
          };

          delete chatState.videoCall;

          if (user) {
            chatState.contact = Meteor.users.findOne({
              username: contactUsername,
            });

            if (chatState.contact) {
              chatState.hasContact = userHasContact(user, chatState.contact._id);

              if (chatState.hasContact) {
                chatState.messages = Messages.find({
                  $or: [
                    { userId: user._id, toUserId: { $in: [chatState.contact._id] } },
                    { userId: chatState.contact._id, toUserId: { $in: [user._id] } },
                    { userId: Meteor.settings.public.bot.id, toUserId: { $in: [user._id] }, contactId: { $in: [chatState.contact._id] } },
                  ]
                }, {
                  sort: {
                    sentAt: -1
                  }
                }).fetch();

                chatState.users = Meteor.users.find({
                  _id: {
                    $in: _.uniq(_.pluck(chatState.messages, 'userId')),
                  },
                }).fetch();

                chatState.files = Files.find({
                  $or: [
                    { userId: user._id, 'meta.contactId': { $in: [chatState.contact._id] }},
                    { userId: chatState.contact._id, 'meta.contactId': { $in: [user._id] }},
                  ]
                }).fetch();
              }
            }
          }

          return chatState;
        },
        onReadyData: () => ({
          contactUsername,
        }),
      },
    });
  };
}
