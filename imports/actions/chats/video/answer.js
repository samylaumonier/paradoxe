import Notifications from 'react-notification-system-redux';

import { chatVideoListenToConnections } from './connection';
import { initVideoPeer } from './peer';
import { getVideoUserStream } from './stream';
import { chatVideoUpdate } from './update';

import { ANSWERED_STATUS } from '/imports/api/collections/messages';

export function answerVideoCall(contact, message) {
  return dispatch => {
    dispatch(getVideoUserStream((err, stream) => {
      if (err) {
        console.log(err);
        dispatch(
          Notifications.error({
            title: `An error occurred`,
            message: 'Webcam must be allowed to make a video call.',
            position: 'tr',
            autoDismiss: 5,
            dismissible: true
          })
        );
      } else {
        dispatch(chatVideoUpdate(contact, { stream }));
        dispatch(initVideoPeer(contact, (userPeerId, peer) => {
          dispatch(chatVideoUpdate(contact, {
            userPeerId,
            isRinging: false,
          }));

          if (userPeerId) {
            dispatch(setStatusAnswered(contact, message, stream, peer));
          } else {
            dispatch(
              Notifications.error({
                title: `An error occurred`,
                message: 'Unable to connect to the server.',
                position: 'tr',
                autoDismiss: 5,
                dismissible: true
              })
            );
          }
        }));
      }
    }));
  };
}

function setStatusAnswered(contact, message, stream, peer) {
  return dispatch => {
    Meteor.call('updateVideoCallStatus', message._id, ANSWERED_STATUS, err => {
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
      } else {
        const call = peer.call(message.contactVideoPeerId, stream);

        dispatch(chatVideoUpdate(contact, {
          contactPeerId: message.contactVideoPeerId,
          call,
          callMessageId: message._id,
        }));

        dispatch(chatVideoListenToConnections(contact, peer));

        call.on('stream', contactStream => {
          dispatch(chatVideoUpdate(contact, {
            stream,
            call,
            contactStream,
          }));
        });
      }
    });
  };
}
