import Notifications from 'react-notification-system-redux';

import { stopVideoPeer } from './peer';

export function stopVideoCall(contact) {
  return (dispatch, getState) => {
    const videoCallState = getState().chats[contact.username].videoCall;

    Meteor.call('updateVideoCallStatusHungUp', videoCallState.callMessageId, err => {
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

    dispatch(stopVideoPeer(contact, videoCallState.peer));
  };
}
