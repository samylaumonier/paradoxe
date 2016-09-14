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
        toastr.error('Webcam must be allowed to make a video call.', 'Error');
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
            toastr.error('Unable to connect to the server.', 'Error');
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
        toastr.error(err.reason, 'Error');
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
