import { initVideoPeer } from './peer';
import { getVideoUserStream } from './stream';
import { chatVideoUpdate } from './update';

export function startVideoCall(contact) {
  return dispatch => {
    if (!contact.status.online) {
      toastr.error(`${contact.username} is offline.`, 'Error');
      return false;
    }

    dispatch(getVideoUserStream((err, stream) => {
      if (err) {
        toastr.error('Webcam must be allowed to make a video call.', 'Error');
      } else {
        dispatch(chatVideoUpdate(contact, { stream }));
        dispatch(initVideoPeer(contact, userPeerId => {
          Meteor.call('startVideoCall', userPeerId, contact._id, (err, callMessageId) => {
            if (err) {
              toastr.error(err.reason, 'Error');
            } else {
              dispatch(chatVideoUpdate(contact, { callMessageId }));
            }
          });
        }));
      }
    }));
  };
}
