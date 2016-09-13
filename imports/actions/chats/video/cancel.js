import { stopVideoPeer } from './peer';

import { CANCELED_STATUS } from '/imports/api/collections/messages';

export function cancelVideoCall(contact, message) {
  return (dispatch, getState) => {
    Meteor.call('updateVideoCallStatus', message._id, CANCELED_STATUS, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    const videoCallState = getState().chats[contact.username].videoCall;
    dispatch(stopVideoPeer(contact, videoCallState.peer));
  };
}
