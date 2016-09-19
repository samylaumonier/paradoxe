import Notifications from 'react-notification-system-redux';

import { stopVideoPeer } from './peer';

export function videoCallHungUp(contact, message) {
  return (dispatch, getState) => {
    Meteor.call('setVideoCallHungUp', message._id, err => {
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

    const videoCallState = getState().chats[contact.username].videoCall;
    dispatch(stopVideoPeer(contact, videoCallState.peer));
  };
}
