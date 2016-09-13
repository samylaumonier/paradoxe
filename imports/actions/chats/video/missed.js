import { stopVideoPeer } from './peer';

export function videoCallMissed(contact, message) {
  return (dispatch, getState) => {
    Meteor.call('setVideoCallMissed', message._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    const videoCallState = getState().chats[contact.username].videoCall;
    dispatch(stopVideoPeer(contact, videoCallState.peer));
  };
}
