import Notifications from 'react-notification-system-redux';

import { stopVideoPeer } from './peer';

import { CANCELED_STATUS } from '/imports/api/collections/messages';

export function cancelVideoCall(contact, message) {
  return (dispatch, getState) => {
    Meteor.call('updateVideoCallStatus', message._id, CANCELED_STATUS, err => {
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
