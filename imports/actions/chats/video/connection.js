import Notifications from 'react-notification-system-redux';

import { stopVideoPeer } from './peer';
import { chatVideoUpdate } from './update';

export function chatVideoListenToConnections(contact, peer) {
  return (dispatch, getState) => {
    _.each(peer.connections, connections => {
      connections.forEach(connection => {
        connection.on('close', () => {
          const videoState = getState().chats[contact.username].videoCall;

          if (videoState.isHangingUp) {
            dispatch(chatVideoUpdate(contact, {
              isHangingUp: false,
            }));
          } else {
            dispatch(chatVideoConnectionLost(contact, peer))
          }
        });
      });
    });
  };
}

export function chatVideoConnectionLost(contact, peer) {
  return (dispatch, getState) => {
    const incomingMessageId = getState().chats[contact.username].videoCall.callMessageId;
    dispatch(stopVideoPeer(contact, peer));

    if (incomingMessageId) {
      Meteor.call('updateVideoCallStatusConnectionLost', incomingMessageId, err => {
        if (err) {
          dispatch(
            Notifications.error({
              title: `An error occurred`,
              message: err.reason,
              position: 'tr',
              autoDismiss: 5,
              dismissible: true
            })
          );
        }
      });
    }
  };
}
