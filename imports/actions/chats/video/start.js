import Notifications from 'react-notification-system-redux';

import { initVideoPeer } from './peer';
import { getVideoUserStream } from './stream';
import { chatVideoUpdate } from './update';

export function startVideoCall(contact) {
  return dispatch => {
    if (!contact.status.online) {
      dispatch(
        Notifications.error({
          title: `An error occurred`,
          message: `${contact.username} is offline.`,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        })
      );
      return false;
    }

    dispatch(getVideoUserStream((err, stream) => {
      if (err) {
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
        dispatch(initVideoPeer(contact, userPeerId => {
          Meteor.call('startVideoCall', userPeerId, contact._id, (err, callMessageId) => {
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
              dispatch(chatVideoUpdate(contact, {
                callMessageId,
                isRinging: true,
              }));
            }
          });
        }));
      }
    }));
  };
}
