import { stopVideoPeer } from './peer';

export function stopVideoCall(contact) {
  return (dispatch, getState) => {
    const videoCallState = getState().chats[contact.username].videoCall;

    Meteor.call('updateVideoCallStatusHungUp', videoCallState.callMessageId, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    dispatch(stopVideoPeer(contact, videoCallState.peer));
  };
}
