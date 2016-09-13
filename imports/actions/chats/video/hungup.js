import { stopVideoPeer } from './peer';

export function videoCallHungUp(contact, message) {
  return (dispatch, getState) => {
    Meteor.call('setVideoCallHungUp', message._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    const videoCallState = getState().chats[contact.username].videoCall;
    dispatch(stopVideoPeer(contact, videoCallState.peer));
  };
}
